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
import { selectState } from "../Auth/authSlice";
import { useSelector } from "react-redux";

function TeamsScreen(props) {
  const state = useSelector(selectState);
  //{
  //  id: 0,
  //  name: "",
  //  credit: "",
  //  country: "",
  //  membership: "",
  //}
  const [teams, setTeams] = useState([]);

  const selectTeam = async (id) => {
    props.navigation.navigate("BattlePickScreen", {
      teamID: id,
    });
  };

  useEffect(() => {
    const getTeams = async () => {
      try {
        FourBrainsAPI.get(`4brains/user/teams/get/`, {
          headers: { Authorization: `Token ${state.userToken}` },
        })
          .then(function (response) {
            if (response.data.teams) {
              setTeams(
                response.data.teams.filter((team) => team.membership === "mng")
              );
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

  }, []);

  const renderTeam = ({ item }) => (
    <Team selectTeam={selectTeam} id={item.id} name={item.name} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
  },
  titleText: {
    fontSize: 30,
    padding: 5,
  },
  container: {
    flex: 1,
    paddingTop:100,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default TeamsScreen;
