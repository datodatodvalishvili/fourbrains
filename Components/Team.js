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
    borderWidth:2,
    borderColor:"#FFBA01",
    width: 350,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  teamText: {
    fontSize: 30,
  },
});

export default Team;
