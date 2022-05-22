import React, { useEffect } from "react";
//import React in our code.
import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  getTeamDetails,
  selectTeamDetails,
  updateMemberStatus,
} from "../State/teamDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectState, selectUserInfo } from "../Auth/authSlice";
import FourBrainsAPI from "../axios/FourBrainsAPI";

function TeamDetailsScreen(props) {
  const dispatch = useDispatch();
  const teamDetails = useSelector(selectTeamDetails);
  const userInfo = useSelector(selectUserInfo);
  const state = useSelector(selectState);
  useEffect(() => {
    dispatch(
      getTeamDetails({
        token: state.userToken,
        team_id: teamDetails.teamData.id,
      })
    );
  }, []);
  const invitePlayer = () => {
    props.navigation.navigate("InvitePlayerScreen");
  };
  const leaveTeam = () => {
    dispatch(
      updateMemberStatus({
        token: state.userToken,
        player_id: userInfo.id,
        team_id: teamDetails.teamData.id,
        status: "del",
        updateCurUser: true,
      })
    );
    props.navigation.navigate("MainScreen");
  };
  const removeTeamMember = (id) => {
    console.log(id);
    dispatch(
      updateMemberStatus({
        token: state.userToken,
        player_id: id,
        team_id: teamDetails.teamData.id,
        status: "del",
      })
    );
  };
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.containerPlayer}>
        <Text style={styles.member}>
          {item.status_string}: {item.player_name}
        </Text>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => removeTeamMember(item.player_id)}
        >
          <Text> X</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const compare = (a, b) => {
    if (a.status_string < b.status_string) {
      return -1;
    }
    if (a.status_string > b.status_string) {
      return 1;
    }
    return 0;
  };
  const membersData = [...teamDetails.membersData];
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.labelBox}>
        <Text>Team ID: {teamDetails.teamData.id}</Text>
      </View>
      <View style={styles.labelBox}>
        <Text>Team name: {teamDetails.teamData.name}</Text>
      </View>
      <View style={styles.membersBox}>
        {membersData ? (
          <FlatList
            data={membersData.sort(compare).filter(function (member) {
              return member.status !== "del";
            })}
            renderItem={renderItem}
            keyExtractor={(member) => member.player_id}
          />
        ) : (
          <></>
        )}
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => invitePlayer()} style={styles.button}>
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
  labelBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#FFBA01",
    width: 350,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  membersBox: {
    flex: 15,
    borderWidth: 2,
    borderColor: "#FFBA01",
    width: 350,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  member: {
    width: 280,
    padding: 10,
    alignSelf: "stretch",
    marginVertical: 20,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#FFBA01",
    textTransform: "capitalize",
  },
  delete: {
    padding: 10,
    alignSelf: "stretch",
    marginVertical: 20,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#FFBA01",
    textTransform: "capitalize",
  },
  container: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  containerPlayer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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

export default TeamDetailsScreen;
