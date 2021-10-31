import React from "react";
//import React in our code.
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Question from "../Components/Question";
import db from "../FireBase/FirebaseConfig";
import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

function PlayerScreen(props) {
  const [question, loading, error] = useObject(ref(db, "4brains/battle/4/curq"));

  return (
    <View style={styles.container}>
      {error && <Text>Error: {error}</Text>}
      {loading && <Text>Value: Loading...</Text>}
      {question && <Question question={question.val()} />}
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

export default PlayerScreen;
