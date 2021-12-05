import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Question({ question }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question_text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  questionText: {
    fontSize: 22
  },
  questionContainer: {
    paddingVertical:30,
    borderWidth: 1,
    borderColor: "#FFBA01",
    padding: 5,
    flex:1
  },
});

export default Question;
