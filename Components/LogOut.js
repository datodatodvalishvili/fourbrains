// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/

import React from "react";
//import React in our code.
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
//import all the components we are going to use.
import { AuthContext } from "../App";

function LogOut({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => signOut()}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  buttonStyle: {
    padding: 10,
    width: "100%",
    marginTop: 0,
  },
});

export default LogOut;
