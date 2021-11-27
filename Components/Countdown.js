import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Countdown from "react-countdown";

function CountdownComponent({ startTime, setState, setTimeUp }) {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      if (setState) {
        setState(0);
      }
      setTimeUp(true);
      return <Text>1</Text>;
    } else {
      return (
        <Text>
          {minutes}:{seconds}
        </Text>
      );
    }
  };

  return (
    <View style={styles.buttonStyleTimer}>
      <Countdown
        date={startTime + 10000}
        renderer={renderer}
        precision={3}
        intervalDelay={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyleTimer: {
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#FAA0A0",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
});

export default CountdownComponent;
