import React, { useState } from "react";
//import React in our code.
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Question from "../Components/Question";
import axios from "axios";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpD4Yw4rmH3okTP2ocAq5Tge3H7Qrm9lA",
  authDomain: "gepardy.firebaseapp.com",
  databaseURL: "https://gepardy-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gepardy",
  storageBucket: "gepardy.appspot.com",
  messagingSenderId: "536272414756",
  appId: "1:536272414756:web:a1c80a86c24521f61590b1",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


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
    writeUserData();
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
