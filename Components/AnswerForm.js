import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

function AnswerForm({ sendAnswer, gameState, answer, setAnswer }) {
  function sendAnswerOnClick() {
    sendAnswer(answer);
  }
  return (
    <View style={styles.topBox}>
      <TextInput
        editable={gameState === "ACTIVE"}
        style={
          gameState !== "ACTIVE" ? styles.inputBoxAnswered : styles.inputBox
        }
        placeholder="Answer"
        value={answer}
        onChangeText={setAnswer}
      />
      <TouchableOpacity
        disabled={gameState !== "ACTIVE"}
        style={gameState !== "ACTIVE" ? styles.buttonAnswered : styles.button}
        onPress={() => sendAnswerOnClick()}
      >
        {gameState !== "ACTIVE" ? (
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Answer sent
          </Text>
        ) : (
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
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
    borderRadius: 15,
    flex: 1,
  },
  inputBox: {
    flex: 3,
    backgroundColor: "white",
    fontSize: 18,
    textAlign: "center",
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },
  inputBoxAnswered: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    flex: 3,
    backgroundColor: "#ede8e8",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#01A049",
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
  },
  buttonAnswered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
  },
});

export default AnswerForm;
