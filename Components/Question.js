import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ceil } from "react-native-reanimated";

function Question({ question }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question_text}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  questionText: {
    fontSize: 19,
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#FFBA01",
    flex: 1,
    borderRadius: 15,
  },
});

export default Question;
