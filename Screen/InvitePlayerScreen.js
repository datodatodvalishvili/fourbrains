import React, { useEffect, useState } from "react";
//import React in our code.
import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectState } from "../Auth/authSlice";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import { getTeamDetails, inviteToTeam, selectTeamDetails } from "../State/teamDetailsSlice";

function InvitePlayerScreen(props) {
  const [playerID, setPlayerID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState();
  const [errorText, setErrorText] = useState("");
  const teamDetails = useSelector(selectTeamDetails);
  const state = useSelector(selectState);
  useEffect(() => {
    setErrorText("");
    setPlayer(null);
    if (playerID) {
      const delayInput = setTimeout(() => {
        setIsLoading(true);
        try {
          FourBrainsAPI.get(`4brains/player/${playerID}/mininfo/`, {
            headers: { Authorization: `Token ${state.userToken}` },
          })
            .then(function (response) {
              console.log(response.data);
              if (response.data.success) {
                setPlayer(response.data.player_data);
              } else {
                setErrorText("Player not found!");
              }
            })
            .catch(function (error) {
              setErrorText("Player not found!");
            });
        } catch (error) {
          setErrorText("Player not found!");
        }
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(delayInput);
    }
  }, [playerID]);

  const dispatch = useDispatch();

  const sendInvitation = () => {
    dispatch(
      inviteToTeam({
        token: state.userToken,
        player_id: player.id,
        player_username: player.username,
        team_id: teamDetails.teamData.id,
        status: "inv",
      })
    );
    dispatch(
      getTeamDetails({
        token: state.userToken,
        team_id: teamDetails.teamData.id,
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TextInput
        autoCapitalize="none"
        style={styles.inputBox}
        placeholder="Player ID/Username"
        value={playerID}
        onChangeText={setPlayerID}
      />
      {player && (
        <View>
          <Text>ID: {player.id}</Text>
          <Text>Name: {player.fullname}</Text>
          <Text>Username: {player.username}</Text>
        </View>
      )}
      <View style={styles.container}>
        <TouchableOpacity
          disabled={!player}
          onPress={() => sendInvitation()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Invite Player</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    marginTop: StatusBar.currentHeight + 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputBox: {
    padding: 7,
    borderWidth: 2,
    borderColor: "#FFBA01",
    width: 299,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "black",
    marginVertical: 9,
  },
  container: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFBA01",
    width: 299,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    marginVertical: 10,
  },
});

export default InvitePlayerScreen;
