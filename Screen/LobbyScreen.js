import React, { useEffect, useState } from "react";
//import React in our code.
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import { selectState } from "../Auth/authSlice";
import { useSelector } from "react-redux";

function LobbyScreen() {
  const state = useSelector(selectState);
  //{
  //  id: 0,
  //  name: "",
  //  country: "",
  //}
  const [teams, setTeams] = useState([]);

  const battleID = 4;

  const getTeams = async () => {
    try {
      FourBrainsAPI.get(`4brains/battle/${battleID}/lobby/teams`, {
        headers: { Authorization: `Token ${state.userToken}` },
      })
        .then(function (response) {
          if (response.data.teams) {
            setTeams(response.data.teams);
          }
        })
        .catch(function (error) {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const renderTeam = ({ item }) => <Text>{item.name}</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>{teams.length} Teams</Text>
        <FlatList
          data={teams}
          renderItem={renderTeam}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default LobbyScreen;
