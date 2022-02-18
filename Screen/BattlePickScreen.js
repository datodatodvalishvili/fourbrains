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

function BattlePickScreen(props) {
  const state = useSelector(selectState);
  //{
  //  id: 0,
  //  name: "",
  //  credit: "",
  //  country: "",
  //  membership: "",
  //}
  const [battles, setBattles] = useState([]);

  const selectBattle = async (id) => {
    props.navigation.navigate("PlayerScreen", {
      teamId: props.route.params.teamID,
      battleID: id,
    });
  };

  useEffect(() => {
    const getBattles = async () => {
      try {
        FourBrainsAPI.get(
          `4brains/team/${props.route.params.teamID}/battles/upcoming/`,
          {
            headers: { Authorization: `Token ${state.userToken}` },
          }
        )
          .then(function (response) {
            if (response.data.battles) {
              setBattles(response.data.battles);
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

    getBattles();
  }, []);

  const renderTeam = ({ item }) => (
    <Team
      selectTeam={selectBattle}
      id={item.battle_id}
      name={item.battle_name}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={battles}
          renderItem={renderTeam}
          keyExtractor={(item) => item.battle_id}
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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default BattlePickScreen;
