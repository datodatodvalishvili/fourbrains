import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { selectState, selectUserInfo, signup, updateUser } from "../Auth/authSlice";
import LogOut from "../Components/LogOut";

function UserProfileScreen() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const state = useSelector(selectState);

  useEffect(() => {
    console.log(userInfo);
    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
    setEmail(userInfo.email);
  }, [userInfo]);

  const handleSignUp = () => {
    setErrorMsg("");
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

    dispatch(
      updateUser(
        {
          email,
          firstName,
          lastName,
          phone_prefix: userInfo.phone_prefix,
          phone: userInfo.phone,
          show_fullname_4b: 1,
          username: userInfo.username,
          token: state.userToken,
        },
        setErrorMsg
      )
    );
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <SafeAreaView style={styles.safeArea}>
        <Image style={styles.logo} source={require("../img/logo.png")} />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              editable={false}
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="Username"
              value={userInfo.username}
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
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>

        <LogOut />
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

export default UserProfileScreen;
