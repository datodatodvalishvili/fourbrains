import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";

function Answers({ question }) {
  const [state, setState] = useState(0);
  const options = [
    {
      value: 0,
      label: "Answer",
    },
    {
      value: 1,
      label: "Source",
    },
    {
      value: 2,
      label: "Comment",
    },
  ];

  function renderSwitch() {
    switch (state) {
      case 0:
        return <Text>{question.answer}</Text>;
      case 1:
        return <Text>{question.source}</Text>;
      case 2:
        return <Text>{question.comment}</Text>;
      default:
        return <Text>{question.answer}</Text>;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SwitchSelector
        height={35}
        selectedColor="white"
        buttonColor="#FFBA01"
        style={{ marginLeft: 20, marginBottom: 10 }}
        options={options}
        initial={0}
        onPress={(item) => {
          setState(item);
        }}
      />
      <View style={styles.answerContainer}>{renderSwitch()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFBA01",
  },
});

export default Answers;
