import React from "react";
import { Text, View } from "react-native";

function Question({ question }) {
return (
  <View>
    <Text>
      Question N{question.qn}: {question.question_text}
    </Text>
  </View>
);
}

export default Question;
