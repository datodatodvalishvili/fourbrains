import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

function PlayerAnswer({ setIsCorrect, answer, correctAnswersArray }) {
  return (
    <View style={styles.topContainer}>
      {answer ? (
        <>
          <View style={styles.topBox}>
            <Text style={styles.questionNumberBox}># {answer.qn}</Text>
            <Text style={styles.correctAnswerBox}>
              {!answer ? null : correctAnswersArray[parseInt(answer.qn) - 1]}
            </Text>
          </View>
          <View style={styles.answerBox}>
            <Text> {answer.answer}</Text>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.buttonWrong}
              onPress={() => setIsCorrect(false)}
            >
              <Text style={styles.buttonText}>Wrong</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCorrect}
              onPress={() => setIsCorrect(true)}
            >
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>No answers! </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    padding: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  topBox: {
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "#FFBA01",
  },
  questionNumberBox: {
    color: "white",
    borderRightWidth: 1,
    borderRightColor: "black",
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    textAlignVertical: "center",
  },
  correctAnswerBox: {
    color: "white",
    flex: 4,
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
  },
  answerBox: {
    flex: 2,
    borderColor: "green",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonCorrect: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#228B22",
    padding: 11,
    alignContent: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 5,
  },
  buttonWrong: {
    borderBottomStartRadius: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#ED1C24",
    padding: 11,
    alignContent: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlayerAnswer;
