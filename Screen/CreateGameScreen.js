import React from "react";
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
import { selectState } from "../Auth/authSlice";
import { useSelector } from "react-redux";

function CreateGameScreen(props) {
  const state = useSelector(selectState);
  const [venueName, setVenueName] = React.useState("");
  const [tournament, setTournament] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    getTournaments();
  }, []);

  const getTournaments = async () => {
    try {
      FourBrainsAPI.get("4brains/user/tournaments/hostable/", {
        headers: { Authorization: `Token ${state.userToken}` },
      })
        .then(function (response) {
          // handle success
          if (response.data.success) {
            setItems(
              response.data.regular_tournaments.map((tour) => ({
                label: tour.name,
                value: tour.id,
              }))
            );
          } else setErrorMsg(response.data.message);
        })
        .catch(function (error) {
          setErrorMsg("Server error!");
        });
    } catch (error) {
      setErrorMsg("Server error!");
    }
  };

  const createGame = async () => {
    try {
      FourBrainsAPI.post(
        "4brains/battle/create/",
        {
          tournament_id: tournament,
          venue_string: venueName,
        },
        {
          headers: { Authorization: `Token ${state.userToken}` },
        }
      )
        .then(function (response) {
          if (response.data.success) {
          } else setErrorMsg(response.data.message);
        })
        .catch(function (error) {
          setErrorMsg("Server error!");
        });
    } catch (error) {
      setErrorMsg("Server error!");
    }
  };

  const handleGameCreate = () => {
    setErrorMsg("");

    if (!tournament) {
      setErrorMsg("Please select tournament");
      return;
    }
    if (!venueName) {
      setErrorMsg("Please fill venue name");
      return;
    }

    createGame();
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
              value={tournament}
              items={items}
              setOpen={setOpen}
              setValue={setTournament}
              setItems={setItems}
              placeholder="Select tournament"
            />
            <TextInput
              autoCapitalize="none"
              style={styles.inputBox}
              placeholder="Venue name"
              value={venueName}
              onChangeText={setVenueName}
            />
            {errorMsg ? (
              <Text style={{ color: "red" }}>{errorMsg}</Text>
            ) : (
              <></>
            )}
            <TouchableOpacity
              onPress={() => handleGameCreate()}
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

export default CreateGameScreen;
