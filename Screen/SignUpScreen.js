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
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AuthContext from "../context/AuthContext";

function SignUpScreen() {
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const { signUp, signIn } = React.useContext(AuthContext);

  const handleSignUp = () => {
    setErrorMsg("");
    if (!username) {
      setErrorMsg("Please fill Username");
      return;
    }
    if (!email) {
      setErrorMsg("Please fill Email");
      return;
    }
    if (!firstName) {
      setErrorMsg("Please fill First name");
      return;
    }
    if (!lastName) {
      setErrorMsg("Please fill Last name");
      return;
    }
    if (!password) {
      setErrorMsg("Please fill Password");
      return;
    }
    if (!password1) {
      setErrorMsg("Please re enter Password");
      return;
    }
    if (password != password1) {
      setErrorMsg("Passwords didn’t match. Try again.");
      return;
    }

    if (
      signUp({ username, email, firstName, lastName, password }, setErrorMsg)
    ) {
      signIn({ username, password }, setErrorMsg);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <SafeAreaView style={styles.safeArea}>
        <Image style={styles.logo} source={require("../img/logo.png")} />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
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
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="Re enter password"
              value={password1}
              onChangeText={setPassword1}
              secureTextEntry
            />
            {errorMsg ? (
              <Text style={{ color: "red" }}>{errorMsg}</Text>
            ) : (
              <></>
            )}
          </View>
          <TouchableOpacity
            onPress={() => handleSignUp()}
            style={styles.buttonSignUp}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: 240,
    height: 120,
    marginBottom: 20,
    alignSelf: "center",
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputBox: {
    flex: 1,
    padding: 3,
    borderWidth: 2,
    borderColor: "#FFBA01",
    width: 299,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "black",
    marginVertical: 9,
  },
  buttonSignUp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "black",
    width: 299,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 50,
  },
  buttonText: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
});

export default SignUpScreen;
