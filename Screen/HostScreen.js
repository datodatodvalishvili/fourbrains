import React, { useState, useEffect } from "react";
//import React in our code.
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Question from "../Components/Question";
import db from "../FireBase/FirebaseConfig";
import axios from "axios";
import { ref, set } from "firebase/database";
import Answers from "../Components/Answers";

function writeUserData() {
  try {
    set(ref(db, "4brains/test"), {
      test_string: "Im here",
      test_number: 45,
    });
  } catch (error) {
    console.error(error);
  }
}

function HostScreen(props) {

  const [question, setQuestion] = useState({
    qn: 1,
    question_text: "",
    answer: "",
    source: "",
    comment: "",
  });

  const nextQuestion = async () => {
    console.log(test.val());
    //writeUserData();
    try {
      axios
        .get(
          `http://tifliser.com/api/4brains/battle/4/question/${question.qn}/next/`,
          {
            headers: { Authorization: `Bearer ${props.userToken}` },
          }
        )
        .then(function (response) {
          // handle success
          if (response.data.question_data) {
            setQuestion(response.data.question_data);
          } else alert("Server error");
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => nextQuestion()}
      >
        <Text>Next question</Text>
      </TouchableOpacity>
      <Question question={question} />
      <Answers question={question} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 1,
    padding: 16,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "100%",
    marginTop: 16,
  },
});

export default HostScreen;
