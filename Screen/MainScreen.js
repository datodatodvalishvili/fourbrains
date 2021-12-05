// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/

import React from "react";
//import React in our code.
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
//import all the components we are going to use.
import AuthContext from "../context/AuthContext";

function MainScreen({ navigation, userToken }) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image style={styles.logo} source={require("../img/logo.png")} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TeamCreationScreen", { userToken: userToken })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create team</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TeamCreationScreen", { userToken: userToken })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TeamCreationScreen", { userToken: userToken })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Join game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  logo: {
    width: 240,
    height: 120,
    marginBottom: 20,
    alignSelf: "center",
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
  container: {
    flex: 1,
    flexDirection: "column",
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
});

export default MainScreen;
