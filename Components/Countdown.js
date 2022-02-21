import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { setTimeUp } from "../State/gameSlice";
import { useDispatch } from "react-redux";

function CountdownComponent({ startTime }) {
  return (
    <View style={styles.buttonStyleTimer}>
      <Countdown startTime={startTime} />
    </View>
  );
}

const calculateTimeLeft = (StartDate) => {
  let difference = Math.floor(StartDate + 60 * 1000 - new Date().getTime());
  let seconds = 0;
  if (difference > 0) {
    seconds = Math.floor((difference / 1000) % 60);
  }
  return seconds;
};

function Countdown({ startTime }) {
  dispach = useDispatch();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds <= 1) {
        dispach(setTimeUp());
        clearInterval(timer);
      }
      setSeconds(calculateTimeLeft(startTime));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Text style={styles.timeText}>{seconds}</Text>;
}

const styles = StyleSheet.create({
  buttonStyleTimer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#FAA0A0",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  timeText: {
    fontSize: 20,
  },
});

export default CountdownComponent;
