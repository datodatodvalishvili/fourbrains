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
  requestResetPassword,
  selectCodeChecked,
  selectResetToken,
  sendResetPasswordCode,
  setResetToken,
} from "../State/forgotPasswordSlice";
import EnterNewPasswordScreen from "./EnterNewPasswordScreen";

function ForgotPasswordScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [resetCode, setResetCode] = React.useState("");
  useEffect(() => {
    dispatch(setResetToken(""));
  }, []);

  const resetToken = useSelector(selectResetToken);
  const codeChecked = useSelector(selectCodeChecked);

  if (codeChecked) return <EnterNewPasswordScreen resetCode={resetCode} />;
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image style={styles.logo} source={require("../img/logo.png")} />
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          style={styles.inputBox}
          placeholder="Username/Email"
          value={username}
          onChangeText={setUsername}
        />
        {resetToken ? (
          <TextInput
            autoCapitalize="none"
            style={styles.inputBox}
            placeholder="Enter code sent to your mail"
            value={resetCode}
            onChangeText={setResetCode}
          />
        ) : null}
        {!resetToken ? (
          <TouchableOpacity
            onPress={() => dispatch(requestResetPassword({ username }))}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Reset Password</Text>
              <Icon
                name="caretright"
                size={25}
                style={{ alignSelf: "flex-end", color: "white" }}
              ></Icon>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              dispatch(sendResetPasswordCode({ resetToken, resetCode }))
            }
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Submit Code</Text>
              <Icon
                name="caretright"
                size={25}
                style={{ alignSelf: "flex-end", color: "white" }}
              ></Icon>
            </View>
          </TouchableOpacity>
        )}
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

export default ForgotPasswordScreen;
