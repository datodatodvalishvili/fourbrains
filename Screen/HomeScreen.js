// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/

import React from "react";
//import React in our code.
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  StatusBar,
} from "react-native";
import LogOut from "../Components/LogOut";
//import all the components we are going to use.
import { AuthContext } from "../App";

function HomeScreen({ navigation, userToken }) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <LogOut />
        <Button
          style={styles.button}
          title="Go to player screen"
          onPress={() =>
            navigation.navigate("PlayerScreen", { userToken: userToken })
          }
        />
        <Button
          style={styles.button}
          title="Go to host screen"
          onPress={() =>
            navigation.navigate("HostScreen", { userToken: userToken })
          }
        />
        <Button
          style={styles.button}
          title="Go to teams screen"
          onPress={() =>
            navigation.navigate("TeamsScreen", { userToken: userToken })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  button: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
