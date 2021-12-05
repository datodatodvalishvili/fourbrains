import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CountdownComponent from "../Components/Countdown";
import Answers from "../Components/Answers";

function MiddleBox({
  isAnswered,
  onPress,
  data,
  setTimeUp,
  timeUp,
  question,
  isActive,
  answerScreen,
}) {
  if (!timeUp && isActive)
    return (
      <View style={styles.middleBox}>
        <View style={styles.changeButton}>
          {!isAnswered ? (
            <View>
              <TouchableOpacity onPress={() => onPress()}>
                {answerScreen ? (
                  <Icon name="enter-outline" size={50}></Icon>
                ) : (
                  <Icon name="repeat" size={50}></Icon>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.countDown}>
          <CountdownComponent startTime={data.date} setTimeUp={setTimeUp} />
        </View>
      </View>
    );
  else if (isActive)
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
    flex: 5,
  },
});

export default MiddleBox;
