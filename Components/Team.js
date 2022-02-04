import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

function Team({ id, name, selectTeam }) {
  return (
    <TouchableOpacity onPress={() => selectTeam(id)}>
      <View style={styles.team}>
        <Text style={styles.teamText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  team: {
    flexDirection: "row",
    flex: 3,
    borderBottomColor: "#808080",
    borderBottomWidth: 1,
    padding: 10,
  },
  teamText: {
    fontSize: 20,
    color: "#676767",
  },
});

export default Team;
