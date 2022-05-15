// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/

import React, { useEffect, useState } from "react";
//import React in our code.
import LogOut from "../Components/LogOut";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { getTeamDetails, selectTeamDetails } from "../State/teamDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import { selectState } from "../Auth/authSlice";
//import all the components we are going to use.

function MainScreen({ navigation }) {
  const [battleCode, setBattleCode] = useState("");
  const [teamInvite, setTeamInvite] = useState(null);
  const teamDetails = useSelector(selectTeamDetails);
  const state = useSelector(selectState);
  const dispatch = useDispatch();
  const getTeams = () => {
    try {
      FourBrainsAPI.get(`4brains/user/teams/get/`, {
        headers: { Authorization: `Token ${state.userToken}` },
      })
        .then(function (response) {
          if (response.data.teams) {
            dispatch(
              getTeamDetails({
                token: state.userToken,
                team_id: response.data.teams[0].id,
              })
            );
            for (const team of response.data.teams) {
              if (team.membership === "inv") {
                setTeamInvite({ id: team.id, name: team.name });
                break;
              }
              setTeamInvite(null);
            }
          }
        })
        .catch(function (error) {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeams();
  }, []);
  const sendRequestToBattle = () => {
    try {
      FourBrainsAPI.post(
        `4brains/battle/team/status/update/`,
        {
          battle_code: battleCode,
          team_id: teamDetails.teamData.id,
          action: -1,
        },
        {
          headers: { Authorization: `Token ${state.userToken}` },
        }
      )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const acceptTeamInvite = () => {
    try {
      console.log(state);
      FourBrainsAPI.post(
        `4brains/team/player/membership/update/`,
        {
          team_id: teamInvite.id,
          player_id: state.userInfo.id,
          new_status: "mmb",
        },
        {
          headers: { Authorization: `Token ${state.userToken}` },
        }
      )
        .then(function (response) {
          getTeams();
        })
        .catch(function (error) {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const declineTeamInvite = () => {
    try {
      console.log(state);
      FourBrainsAPI.post(
        `4brains/team/player/membership/update/`,
        {
          team_id: teamInvite.id,
          player_id: state.userInfo.id,
          new_status: "del",
        },
        {
          headers: { Authorization: `Token ${state.userToken}` },
        }
      )
        .then(function (response) {
          getTeams();
        })
        .catch(function (error) {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {teamInvite !== null ? (
        <View style={styles.teamInvite}>
          <Text>Team ID: {teamInvite.id}</Text>
          <Text>Team Name: {teamInvite.name}</Text>
          <View style={styles.inviteButtons}>
            <TouchableOpacity onPress={acceptTeamInvite}>
              <Text>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={declineTeamInvite}>
              <Text>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}

      <View style={styles.selectedTeam}>
        <TouchableOpacity onPress={() => navigation.navigate("TeamsScreen")}>
          <TextInput
            label="Selected Team"
            value={teamDetails.teamData.name}
            disabled
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("BattlePickScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TeamDetailsScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Manage Team</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          label="Battle Code"
          value={battleCode}
          style={styles.battleCode}
          onChangeText={(text) => setBattleCode(text)}
        />
        <TouchableOpacity onPress={sendRequestToBattle} style={styles.button}>
          <Text style={styles.buttonText}>Join Battle</Text>
        </TouchableOpacity>
      </View>
      <LogOut />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight + 100,
  },
  logo: {
    width: 240,
    height: 120,
    marginBottom: 20,
    alignSelf: "center",
  },
  teamInvite: {
    borderColor: "#FFBA01",
    width: 299,
    padding: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    marginVertical: 10,
  },
  inviteButtons: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFBA01",
    width: 299,
    padding: 5,
    borderRadius: 10,
    fontSize: 20,
    marginVertical: 10,
  },
  container: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  selectedTeam: {
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  buttonText: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  battleCode: {
    marginTop: 30,
    width: 299,
  },
});

export default MainScreen;
