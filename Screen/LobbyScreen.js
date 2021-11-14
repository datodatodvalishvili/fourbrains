import React, { useEffect, useState } from "react";
//import React in our code.
import { StyleSheet, View, Text, FlatList } from "react-native";
import FourBrainsAPI from "../axios/FourBrainsAPI";

function LobbyScreen(props) {
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
        headers: { Authorization: `Token ${props.route.params.userToken}` },
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
    <View>
      <Text>{teams.length} Teams</Text>
      <FlatList
        data={teams}
        renderItem={renderTeam}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default LobbyScreen;
