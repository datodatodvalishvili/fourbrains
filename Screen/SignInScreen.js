import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
//import React in our code.
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AuthContext from "../context/AuthContext";

function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image style={styles.logo} source={require("../img/logo.png")} />
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          style={styles.inputBox}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          autoCapitalize="none"
          style={styles.inputBox}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errorMsg ? <Text style={{ color: "red" }}>{errorMsg}</Text> : <></>}
        <TouchableOpacity
          onPress={() => signIn({ username, password }, setErrorMsg)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
            <Icon
              name="caretright"
              size={25}
              style={{ alignSelf: "flex-end", color: "white" }}
            ></Icon>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <View style={styles.buttonSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
            <Icon
              name="caretright"
              size={25}
              style={{ alignSelf: "flex-end", color: "white" }}
            ></Icon>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 240,
    height: 120,
    marginBottom: 20,
    alignSelf: "center",
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    padding: 7,
    borderWidth: 2,
    borderColor: "#FFBA01",
    width: 299,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "black",
    marginVertical: 9,
  },
  button: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#FFBA01",
    width: 299,
    borderRadius: 10,
    padding: 7,
    fontSize: 20,
    marginVertical: 9,
  },
  buttonSignUp: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "black",
    width: 299,
    borderRadius: 10,
    padding: 7,
    fontSize: 20,
    marginVertical: 9,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
});

export default SignInScreen;
