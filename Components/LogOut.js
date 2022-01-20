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
        style={styles.buttonStyle}
        onPress={() => dispatch(signout())}
      >
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
