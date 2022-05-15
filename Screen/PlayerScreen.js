import React, { useEffect, useState, useRef } from "react";
//import React in our code.
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  AppState,
  KeyboardAvoidingView,
} from "react-native";
import Question from "../Components/Question";
import AnswerForm from "../Components/AnswerForm";
import MiddleBox from "../Components/MiddleBox";
import db from "../FireBase/FirebaseConfig";
import { ref, set } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import {
  setGameStateCheated,
  setGameState,
  setAnswer,
  selectGameState,
} from "../State/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import PreGameScreen from "./PreGameScreen";

function PlayerScreen(props) {
  const battleID = props.route.params.battleID;
  const teamId = props.route.params.teamId;
  const [question, loading, error] = useObject(
    ref(db, `4brains/battle/${battleID}/curq`)
  );
  const dispatch = useDispatch();
  const gameState = useSelector(selectGameState);
  const [data, setData] = useState({ date: Date.now() });
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/active/)) {
        dispatch(setGameStateCheated());
      }
      appState.current = nextAppState;
    });
  }, [gameState]);
  useEffect(() => {
    const getTime = async () => {
      if (!loading) {
        if (question.val().gameOver) {
          props.navigation.popToTop();
          props.navigation.navigate("GameOverScreen");
        }
        if (question.val().is_active) {
          let start_date = question.val().start_time;
          console.log((Date.now() - start_date) / 1000);
          setData((prevState) => ({
            ...prevState,
            date: start_date,
          }));
          if (gameState === "IDLE_START") {
            dispatch(setGameState("ANSWERED"));
          } else {
            if (gameState === "IDLE") {
              dispatch(setGameState("ACTIVE"));
            } else {
              dispatch(setGameState("IDLE_END"));
            }
          }
        } else {
          dispatch(setGameState("IDLE"));
          dispatch(setAnswer(""));
        }
      } else {
        dispatch(setGameState("LOADING"));
      }
    };

    getTime();
  }, [question]);

  function sendAnswer(answer) {
    dispatch(setGameState("ANSWERED"));
    set(
      ref(
        db,
        `4brains/battle/${battleID}/answers/${teamId}_${question.val().qn}`
      ),
      {
        teamId: teamId,
        answer: answer,
        qn: question.val().qn,
        id: question.val().id,
        answer_time: Date.now() - data.date,
      }
    );
  }

  if (gameState === "LOADING") {
    return <PreGameScreen />;
  }

  return (
    <SafeAreaView behavior="height" style={styles.safeArea}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
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
        {question && <MiddleBox data={data} question={question.val()} />}

        <View style={styles.container}>
          <AnswerForm sendAnswer={sendAnswer} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
// <View style={styles.answerBox}>{renderSwitch()}</View>
const styles = StyleSheet.create({
  questionNumberContainer: {
    backgroundColor: "#FFBA01",
    alignSelf: "center",
    marginHorizontal: 16,
    padding: 5,
    flex: 1,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
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
