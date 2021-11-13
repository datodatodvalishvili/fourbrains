import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Question from "../Components/Question";
import Answers from "../Components/Answers";
import PlayerAnswer from "../Components/PlayerAnswer";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import LogOut from "../Components/LogOut";
import Countdown from "react-countdown";
import { ref, update } from "firebase/database";
import db from "../FireBase/FirebaseConfig";
import { useObject } from "react-firebase-hooks/database";

const battleID = 4;

function HostScreen(props) {
  const [state, setState] = useState(0);
  const [question, setQuestion] = useState({
    qn: 1,
    question_text: "",
    answer: "",
    source: "",
    comment: "",
  });

  const [answer, setAnswer] = useState({
    answer: "",
    teamID: "",
  });

  const [answers, loading, error] = useObject(
    ref(db, `4brains/battle/${battleID}/answers/${question.qn}`)
  );

  useEffect(() => {
    if (!loading) {
      for (const key in answers.val()) {
        console.log(`${key}: ${answers.val()[key]}`);
      }
    }
  }, [answers]);

  function setIsCorrect(IsCorrect) {
    console.log(answers);
    console.log(answers.val());
  }

  const nextQuestion = async () => {
    setState(1);
    try {
      FourBrainsAPI.get(
        `4brains/battle/${battleID}/question/${question.qn}/next`,
        {
          headers: { Authorization: `Token ${props.userToken}` },
        }
      )
        .then(function (response) {
          // handle success
          if (response.data.question_data) {
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

  function startQuestion() {
    setState(2);
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
            style={styles.buttonStyle}
            onPress={() => nextQuestion()}
          >
            <Text>Next question</Text>
          </TouchableOpacity>
        );
      case 1:
        return (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => startQuestion()}
          >
            <Text>Start</Text>
          </TouchableOpacity>
        );
      case 2:
        return (
          <Countdown
            date={Date.now() + 10000}
            renderer={renderer}
            precision={3}
            intervalDelay={0}
          />
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

  const renderer = ({ milliseconds, seconds, completed }) => {
    if (completed) {
      setState(0);
      return <Text></Text>;
    } else {
      // Render a countdown
      return (
        <Text>
          {seconds}:{milliseconds}
        </Text>
      );
    }
  };

  return (
    <View style={styles.topContainer}>
      <LogOut />
      <View style={styles.container}>
        <Question question={question} />
        <Answers question={question} />
        {renderSwitch()}
      </View>
      <View style={styles.answerContainer}>
        <PlayerAnswer answer={answer} setIsCorrect={setIsCorrect} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 5,
    padding: 16,
  },
  topContainer: {
    justifyContent: "flex-start",
    flex: 1,
    padding: 16,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "100%",
    marginTop: 16,
  },
  answerContainer: {
    flex: 5,
  },
});

export default HostScreen;
