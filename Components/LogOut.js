// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/

import React from "react";
//import React in our code.
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
//import all the components we are going to use.
import { signout } from "../Auth/authSlice";
import { useDispatch } from "react-redux";

function LogOut({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(signout())}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#CD001A",
    width: 120,
    padding: 10,
    borderRadius: 10,
    fontSize: 10,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
});

export default LogOut;
