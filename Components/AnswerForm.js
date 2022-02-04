import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function AnswerForm({ sendAnswer, isAnswered }) {
  const [answer, setAnswer] = useState("");
  function sendAnswerOnClick() {
    setAnswer("");
    sendAnswer(answer);
  }
  return (
    <View style={styles.topBox}>
      <TextInput
        editable={!isAnswered}
        style={isAnswered ? styles.inputBoxAnswered : styles.inputBox}
        placeholder="Answer"
        value={answer}
        onChangeText={setAnswer}
      />
      <TouchableOpacity
        disabled={isAnswered}
        style={isAnswered ? styles.buttonAnswered : styles.button}
        onPress={() => sendAnswerOnClick()}
      >
        {isAnswered ? (
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Answer sent
          </Text>
        ) : (
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Send answer
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBox: {
    marginVertical: 20,
    borderColor: "silver",
    borderWidth: 2,
    flex: 1,
  },
  inputBox: {
    flex: 3,
    backgroundColor: "white",
    fontSize: 15,
    textAlign: "center",
  },
  inputBoxAnswered: {
    flex: 3,
    backgroundColor: "#ede8e8",
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#01A049",
  },
  buttonAnswered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
});

export default AnswerForm;
