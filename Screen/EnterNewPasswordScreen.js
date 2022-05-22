import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  requestResetPassword,
  selectCodeChecked,
  selectResetToken,
  sendResetPasswordCode,
  setResetToken,
} from "../State/forgotPasswordSlice";

function EnterNewPasswordScreen({ navigation, resetCode }) {
  const dispatch = useDispatch();
  const resetToken = useSelector(selectResetToken);
  const [password, setPassword] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const codeChecked = useSelector(selectCodeChecked);

  useEffect(() => {
    if (!codeChecked) navigation.navigate("SignIn");
  }, [codeChecked]);

  const handleClick = () => {
    if (password !== password1) {
      setErrorMsg("Passwords don't match");
      return;
    }
    dispatch(changePassword({ password, resetCode, resetToken }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image style={styles.logo} source={require("../img/logo.png")} />
      <View style={styles.container}>
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
        {errorMsg ? <Text style={{ color: "red" }}>{errorMsg}</Text> : <></>}
        <TouchableOpacity onPress={handleClick}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Set New Password</Text>
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
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
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
});

export default EnterNewPasswordScreen;
