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
    fontSize: 19
  },
  questionContainer: {
    paddingVertical:10,
    paddingHorizontal:10,
    borderWidth: 2,
    borderColor: "#FFBA01",
    padding: 5,
    flex:1,
    borderRadius:15
  },
});

export default Question;
