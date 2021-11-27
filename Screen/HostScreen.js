import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Question from "../Components/Question";
import CountdownComponent from "../Components/Countdown";
import Answers from "../Components/Answers";
import PlayerAnswer from "../Components/PlayerAnswer";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import LogOut from "../Components/LogOut";
import { ref, update } from "firebase/database";
import db from "../FireBase/FirebaseConfig";
import { useObject } from "react-firebase-hooks/database";

const battleID = 4;

function HostScreen(props) {
  const [correctAnswersArray, setCorrectAnswersArray] = useState([]);
  const [state, setState] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [curAnswer, setCurAnswer] = useState(0);
  const [question, setQuestion] = useState({
    qn: 0,
    question_text: "",
    answer: "",
    source: "",
    comment: "",
  });

  const [answerArray, setAnswerArray] = useState([
    {
      answer: "",
      answer_time: "",
      teamId: "",
      qn: "",
      correctAnswer: "",
    },
  ]);

  const [answers, loading, error] = useObject(
    ref(db, `4brains/battle/${battleID}/answers`)
  );

  useEffect(() => {
    nextQuestion();
  }, []);

  useEffect(() => {
    function compare(a, b) {
      if (a.qn < b.qn) {
        return -1;
      }
      if (a.qn > b.qn) {
        return 1;
      }
      if (a.answer_time < b.answer_time) {
        return -1;
      }
      if (a.answer_time > b.answer_time) {
        return 1;
      }
      return 0;
    }
    if (!loading) {
      let ansArray = [];
      for (const key in answers.val()) {
        let ansOb = answers.val()[key];
        ansArray.push(ansOb);
      }

      ansArray.sort(compare);
      setAnswerArray(ansArray);
    }
  }, [answers]);

  function setIsCorrect(IsCorrect) {
    const updates = {};
    updates[
      `4brains/battle/4/answers/${answerArray[curAnswer].teamId}_${answerArray[curAnswer].qn}/is_correct`
    ] = IsCorrect;

    update(ref(db), updates);

    setCurAnswer(curAnswer + 1);
  }

  const nextQuestion = async () => {
    try {
      FourBrainsAPI.get(
        `4brains/battle/${battleID}/question/${question.qn + 1}`,
        {
          headers: { Authorization: `Token ${props.route.params.userToken}` },
        }
      )
        .then(function (response) {
          // handle success
          if (response.data.question_data) {
            setCorrectAnswersArray([
              ...correctAnswersArray,
              response.data.question_data.answer,
            ]);
            setState(1);
            setQuestion(response.data.question_data);
          } else alert("Server error");
        })
        .catch(function (error) {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  function timeUp(par) {
    console.log(123);
    const updates = {};
    updates[`4brains/battle/${battleID}/curq/answer`] = question.answer;

    update(ref(db), updates);
  }

  function startQuestion() {
    setState(2);
    setStartTime(Date.now());
    const updates = {};
    updates[`4brains/battle/${battleID}/curq/start_time`] = Date.now();
    updates[`4brains/battle/${battleID}/curq/is_active`] = true;

    update(ref(db), updates);
  }

  function renderSwitch() {
    switch (state) {
      case 0:
        return (
          <TouchableOpacity
            style={styles.buttonStyleNext}
            onPress={() => nextQuestion()}
          >
            <Text>Next question</Text>
          </TouchableOpacity>
        );
      case 1:
        return (
          <TouchableOpacity
            style={styles.buttonStyleStart}
            onPress={() => startQuestion()}
          >
            <Text>Start</Text>
          </TouchableOpacity>
        );
      case 2:
        return (
          <View style={styles.countDown}>
            <CountdownComponent
              startTime={startTime}
              setState={setState}
              setTimeUp={timeUp}
            />
          </View>
        );
      default:
        return (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => nextQuestion()}
          >
            <Text>Next question</Text>
          </TouchableOpacity>
        );
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.questionNumberContainer}>
        <Text style={{ color: "white" }}>Question #{question.qn}</Text>
      </View>
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <View style={styles.question}>
            <Question question={question} />
          </View>
          <View style={styles.answer}>
            <Answers question={question} />
          </View>
          {renderSwitch()}
        </View>
        <View style={styles.answerContainer}>
          <PlayerAnswer
            answer={answerArray[curAnswer]}
            correctAnswersArray={correctAnswersArray}
            setIsCorrect={setIsCorrect}
          />
        </View>
        <LogOut />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  questionNumberContainer: {
    backgroundColor: "#FFBA01",
    alignSelf: "flex-start",
    marginHorizontal: 10,
    padding: 5,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    justifyContent: "flex-start",
    flex: 8,
    paddingHorizontal: 10,
  },
  question: {
    marginBottom: 15,
    flex: 2,
  },
  answer: {
    //borderWidth: 2,
    //borderColor: "blue",
    flex: 1,
  },
  topContainer: {
    flex: 30,
    padding: 0,
  },
  buttonStyleStart: {
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#C1E1C1",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginTop: 16,
  },
  countDown: {
    marginTop: 16,
  },
  buttonStyleTimer: {
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#FAA0A0",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginTop: 16,
  },
  buttonStyleNext: {
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#A7C7E7",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginTop: 16,
  },
  answerContainer: {
    flex: 5,
  },
});

export default HostScreen;
