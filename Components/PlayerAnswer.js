import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

function PlayerAnswer({ setIsCorrect, answer }) {
  return (
    <View style={styles.topContainer}>
      {answer ? (
        <View>
          <Text>Team: {answer.teamID}</Text>
          <Text>Answer: {answer.answer}</Text>
        </View>
      ) : (
        <Text>No answers! </Text>
      )}
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.buttonCorrect}
          onPress={() => setIsCorrect(true)}
        >
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrong}
          onPress={() => setIsCorrect(false)}
        >
          <Text>Wrong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    padding: 16,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonCorrect: {
    flex: 1,
    backgroundColor: "#00FF00",
    borderRadius: 24,
    margin: 9,
    padding: 11,
    alignContent: "stretch",
  },
  button: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrong: {
    flex: 1,
    backgroundColor: "#ff0000",
    borderRadius: 24,
    margin: 9,
    padding: 11,
    alignContent: "stretch",
  },
});

export default PlayerAnswer;
