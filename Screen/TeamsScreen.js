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
import Team from "../Components/Team";
import FourBrainsAPI from "../axios/FourBrainsAPI";

function TeamsScreen(props) {
  //{
  //  id: 0,
  //  name: "",
  //  credit: "",
  //  country: "",
  //  membership: "",
  //}
  const [teams, setTeams] = useState([]);

  const selectTeam = async (id) => {
    try {
      const battlePar = { battle_id: 4, team_id: id, battle_code: "0203" };
      FourBrainsAPI.post(`4brains/battle/team/join/`, battlePar, {
        headers: { Authorization: `Token ${props.route.params.userToken}` },
      })
        .then(function (response) {
          if (response.data.success) {
            props.navigation.navigate("LobbyScreen", {
              userToken: props.route.params.userToken,
              teamID: id,
            });
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
    const getTeams = async () => {
      try {
        FourBrainsAPI.get(`4brains/user/teams/get`, {
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

    getTeams();

    const interval = setInterval(() => getTeams(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderTeam = ({ item }) => (
    <Team
      selectTeam={selectTeam}
      id={item.id}
      name={item.name}
      credit={item.credit}
      country={item.country}
      membership={item.membership}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>Select Team</Text>
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

export default TeamsScreen;
