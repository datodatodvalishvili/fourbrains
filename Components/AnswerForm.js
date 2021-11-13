import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";


function AnswerForm({ sendAnswer }) {
  const [answer, setAnswer] = useState("");

  return (
    <View>
      <TextInput
        style={styles.inputBox}
        placeholder="Answer"
        value={answer}
        onChangeText={setAnswer}
      />
      <Button
        style={styles.button}
        title="Send answer"
        onPress={() => sendAnswer(answer)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: 299,
    backgroundColor: "#ede8e8",
    borderRadius: 24,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#991172",
    marginVertical: 9,
  },
  button: {
    width: 299,
    backgroundColor: "#b8236b",
    borderRadius: 24,
    marginVertical: 9,
    paddingVertical: 11,
  },
});

export default AnswerForm;
