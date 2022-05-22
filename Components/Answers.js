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
  ];

  function renderSwitch() {
    switch (state) {
      case 0:
        return <Text>{question.answer}</Text>;
      default:
        return <Text>{question.answer}</Text>;
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <SwitchSelector
        height={35}
        selectedColor="white"
        buttonColor="#FFBA01"
        borderRadius={0}
        style={{ marginLeft: 0, marginBottom: 0, width: 100 }}
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
    paddingHorizontal:30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFBA01",
    borderRadius: 15,
  },
});

export default Answers;
