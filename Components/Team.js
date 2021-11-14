import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

function Team({ id, name, credit, country, membership, selectTeam }) {
  return (
    <View>
      <TouchableOpacity onPress={() => selectTeam(id)}>
        <Text>
          Name: {name}
          {"\n"}
          Credit: {credit}
          {"\n"}
          Country: {country}
          {"\n"}
          Membership: {membership}
          {"\n"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Team;
