import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import FourBrainsAPI from "../axios/FourBrainsAPI";
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

function TeamCreationScreen(props) {
  const [teamName, setTeamName] = React.useState("");
  const [country, setCountry] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [items, setItems] = React.useState([
    { label: "Georgia", value: "GE" },
    { label: "International", value: "IT" },
  ]);

  const createTeam = async () => {
    try {
      console.log(props.route.params.userToken);
      FourBrainsAPI.post(
        "4brains/team/create/",
        {
          name: teamName,
          represents_country: country,
          about: "created from app",
        },
        {
          headers: { Authorization: `Token ${props.route.params.userToken}` },
        }
      )
        .then(function (response) {
          // handle success
          if (response.data.success) {
            props.navigation.navigate("MainScreen");
          } else setErrorMsg(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
          setErrorMsg("Server error!");
        });
    } catch (error) {
      setErrorMsg("Server error!");
    }
  };

  const handleTeamCreate = () => {
    setErrorMsg("");

    if (!country) {
      setErrorMsg("Please select Country");
      return;
    }
    if (!teamName) {
      setErrorMsg("Please fill Team name");
      return;
    }

    createTeam();
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <SafeAreaView style={styles.safeArea}>
        <Image style={styles.logo} source={require("../img/logo.png")} />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <DropDownPicker
              style={styles.countryPicker}
              open={open}
              value={country}
              items={items}
              setOpen={setOpen}
              setValue={setCountry}
              setItems={setItems}
              placeholder="Select country"
            />
            <TextInput
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="Team name"
              value={teamName}
              onChangeText={setTeamName}
            />
            {errorMsg ? (
              <Text style={{ color: "red" }}>{errorMsg}</Text>
            ) : (
              <></>
            )}
            <TouchableOpacity
              onPress={() => handleTeamCreate()}
              style={styles.buttonCreate}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
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
  countryPicker: {
    borderWidth: 2,
    borderColor: "#FFBA01",
    width: 299,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "black",
    marginVertical: 9,
  },
  inputBox: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#FFBA01",
    width: 299,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "black",
    marginVertical: 9,
  },
  buttonCreate: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFBA01",
    width: 299,
    borderRadius: 10,
    fontSize: 20,
    marginTop: 100,
  },
  buttonText: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
});

export default TeamCreationScreen;
