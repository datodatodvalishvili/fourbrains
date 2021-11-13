import React, { useEffect, useState } from "react";
//import React in our code.
import { StyleSheet, View, Text } from "react-native";
import Question from "../Components/Question";
import AnswerForm from "../Components/AnswerForm";
import db from "../FireBase/FirebaseConfig";
import { ref, set } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import Countdown from "react-countdown";
import TimeAPI from "../axios/TimeAPI";

const battleID = 4;
const teamId = 256;
function PlayerScreen() {
  const [question, loading, error] = useObject(
    ref(db, `4brains/battle/${battleID}/curq`)
  );
  const [isActive, setIsActive] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [data, setData] = useState({ date: Date.now(), delay: 6000 });
  useEffect(() => {
    const getTime = async () => {
      try {
        console.log(1);
        await TimeAPI.get(`tounixtimestamp?datetime=now`)
          .then(function (response) {
            if (response.data.UnixTimeStamp) {
              UnixTimeStamp = response.data.UnixTimeStamp;
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }

      if (!UnixTimeStamp) {
        UnixTimeStamp = Date.now();
      }

      if (!loading) {
        if (question.val().is_active) {
          start_date = question.val().start_time;
          const serverTimestamp = UnixTimeStamp * 1000;
          const timeDiff = Date.now() - serverTimestamp;
          start_date = start_date + timeDiff;
          console.log(start_date - Date.now());
          console.log(timeDiff);
          setData((prevState) => ({
            ...prevState,
            date: start_date,
          }));
          setIsAnswered(false);
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    };

    getTime();
  }, [question]);

  function sendAnswer(answer) {
    setIsAnswered(true);
    set(ref(db, `4brains/battle/4/answers/${question.val().qn}/${teamId}`), {
      answer: answer,
      answer_time: data.date - Date.now(),
    });
  }

  const renderer = ({ milliseconds, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <></>;
    } else {
      // Render a countdown
      return (
        <Text>
          {hours}:{minutes}:{seconds}:{milliseconds}
        </Text>
      );
    }
  };

  function renderSwitch() {
    switch (isActive) {
      case false:
        return <Text>Waiting...</Text>;
      case true:
        return timeUp ? (
          <Text>Time is up!</Text>
        ) : (
          <>
            <Countdown
              date={data.date + data.delay}
              renderer={renderer}
              precision={3}
              intervalDelay={0}
              onComplete={() => setTimeUp(true)}
            />
            {(!isAnswered) ? <AnswerForm sendAnswer={sendAnswer} />: <Text>Saved</Text>}
          </>
        );
      default:
        return <Text>Waiting...</Text>;
    }
  }

  return (
    <View style={styles.container}>
      {error && <Text>Error: {error}</Text>}
      {loading && <Text>Value: Loading...</Text>}
      {question && <Question question={question.val()} />}
      {renderSwitch()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 1,
    padding: 16,
  },
});

export default PlayerScreen;
