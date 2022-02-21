import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CountdownComponent from "../Components/Countdown";
import Answers from "../Components/Answers";
import { selectGameState } from "../State/gameSlice";
import { useSelector } from "react-redux";

function MiddleBox({ data, question }) {
  const gameState = useSelector(selectGameState);
  if (gameState === "ACTIVE" || gameState === "ANSWERED")
    return (
      <View style={styles.middleBox}>
        <View style={styles.countDown}>
          <CountdownComponent startTime={data.date} />
        </View>
      </View>
    );
  else if (gameState === "IDLE_END")
    return (
      <View style={styles.middleBoxAnswers}>
        <Answers question={question} />
      </View>
    );
  else return <></>;
}

const styles = StyleSheet.create({
  middleBox: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    flex: 3,
  },
  middleBoxAnswers: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    flex: 5,
  },
  changeButton: {
    flex: 1,
  },
  countDown: {
    flex: 1,
  },
});

export default MiddleBox;
