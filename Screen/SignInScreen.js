import React from "react";
//import React in our code.
import { Button, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
//import all the components we are going to use.
import { AuthContext } from "../App";

function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        style={styles.button}
        title="Sign in"
        onPress={() => signIn({ username, password })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: 299,
    backgroundColor: "#ede8e8",
    borderRadius: 24,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#991172",
    marginVertical: 9,
  },
  button: {
    width: 299,
    backgroundColor: "#b8236b",
    borderRadius: 24,
    marginVertical: 9,
    paddingVertical: 11,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default SignInScreen;
