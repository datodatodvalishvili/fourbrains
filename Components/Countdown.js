import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

function CountdownComponent({ startTime, setTimeUp }) {
  return (
    <View style={styles.buttonStyleTimer}>
      <Countdown setTimeUp={setTimeUp} startTime={startTime} />
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

function Countdown({ setTimeUp, startTime }) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds <= 1) {
        setTimeUp();
        clearInterval(timer);
      }
      setSeconds(calculateTimeLeft(startTime));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Text style={styles.timeText}>00:{seconds}</Text>;
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
