import React, { useEffect, useState } from "react";
//import React in our code.
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native";
import Question from "../Components/Question";
import AnswerForm from "../Components/AnswerForm";
import MiddleBox from "../Components/MiddleBox";
import db from "../FireBase/FirebaseConfig";
import { ref, set } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import TimeAPI from "../axios/TimeAPI";

const battleID = 4;
const teamId = 256;
function PlayerScreen() {
  const [question, loading, error] = useObject(
    ref(db, `4brains/battle/${battleID}/curq`)
  );
  const [isActive, setIsActive] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerScreen, setAnswerScreen] = useState(false);
  const [data, setData] = useState({ date: Date.now() });
  useEffect(() => {
    let UnixTimeStamp = 0;
    const getTime = async () => {
      try {
        await TimeAPI.get(`tounixtimestamp?datetime=now`)
          .then(function (response) {
            if (response.data.UnixTimeStamp) {
              UnixTimeStamp = response.data.UnixTimeStamp;
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }

      if (!UnixTimeStamp) {
        UnixTimeStamp = Date.now();
      }

      if (!loading) {
        if (question.val().is_active) {
          let start_date = question.val().start_time;
          const serverTimestamp = UnixTimeStamp * 1000;
          const timeDiff = Date.now() - serverTimestamp;
          start_date = start_date + timeDiff;
          setData((prevState) => ({
            ...prevState,
            date: start_date,
          }));
          setIsAnswered(false);
          setIsActive(true);
        } else {
          setIsActive(false);
          setAnswerScreen(false);
        }
      }
    };

    getTime();
    setTimeUp(false);
  }, [question]);

  function setTimeUpFunc() {
    console.log(12);
    setAnswerScreen(true);
    setTimeUp(true);
  }

  function sendAnswer(answer) {
    setIsAnswered(true);
    set(ref(db, `4brains/battle/4/answers/${teamId}_${question.val().qn}`), {
      teamId: teamId,
      answer: answer,
      qn: question.val().qn,
      answer_time: Date.now() - data.date,
    });
  }

  const onPress = () => setAnswerScreen(!answerScreen);

  if (answerScreen)
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.questionNumberContainer}>
          {question && (
            <Text style={{ color: "white" }}>
              Question #{question.val().qn}
            </Text>
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.questionBox}>
            {error && <Text>Error: {error}</Text>}
            {loading && <Text>Value: Loading...</Text>}
            {question && <Question question={question.val()} />}
          </View>
        </View>
        {question && (
          <MiddleBox
            answerScreen={answerScreen}
            isActive={isActive}
            isAnswered={isAnswered}
            onPress={onPress}
            data={data}
            setTimeUp={setTimeUpFunc}
            timeUp={timeUp}
            question={question.val()}
          />
        )}

        <View style={styles.container}>
          <AnswerForm
            sendAnswer={sendAnswer}
            isAnswered={isAnswered || timeUp}
          />
        </View>
      </SafeAreaView>
    );
  else {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.questionNumberContainer}>
          {question && (
            <Text style={{ color: "white" }}>
              Question #{question.val().qn}
            </Text>
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.questionBoxRotated}>
            {error && <Text>Error: {error}</Text>}
            {loading && <Text>Value: Loading...</Text>}
            {question && <Question question={question.val()} />}
          </View>
        </View>
        {question && (
          <MiddleBox
            answerScreen={answerScreen}
            isActive={isActive}
            isAnswered={isAnswered}
            onPress={onPress}
            data={data}
            setTimeUp={setTimeUpFunc}
            timeUp={timeUp}
            question={question.val()}
          />
        )}
        <View style={styles.container}>
          <View style={styles.questionBox}>
            {error && <Text>Error: {error}</Text>}
            {loading && <Text>Value: Loading...</Text>}
            {question && <Question question={question.val()} />}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
// <View style={styles.answerBox}>{renderSwitch()}</View>
const styles = StyleSheet.create({
  questionNumberContainer: {
    backgroundColor: "#FFBA01",
    alignSelf: "flex-start",
    marginHorizontal: 16,
    padding: 5,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  questionBox: {
    justifyContent: "flex-start",
    flex: 1,
    marginBottom: 10,
  },
  questionBoxRotated: {
    transform: [{ rotate: "180deg" }],
    justifyContent: "flex-start",
    flex: 1,
  },
  answerBox: {
    justifyContent: "flex-start",
    flex: 1,
  },
  countDown: {
    flex: 5,
  },
  changeButton: {
    flex: 1,
  },
  middleBox: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    flex: 3,
  },
  container: {
    justifyContent: "flex-start",
    flex: 15,
    marginHorizontal: 16,
  },
});

export default PlayerScreen;
