// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/

import React from "react";
//import React in our code.
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  StatusBar,
} from "react-native";
import LogOut from "../Components/LogOut";
//import all the components we are going to use.

function HomeScreen({ navigation}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <LogOut />
        <Button
          style={styles.button}
          title="Go to player screen"
          onPress={() =>
            navigation.navigate("PlayerScreen")
          }
        />
        <Button
          style={styles.button}
          title="Go to host screen"
          onPress={() =>
            navigation.navigate("HostScreen")
          }
        />
        <Button
          style={styles.button}
          title="Go to teams screen"
          onPress={() =>
            navigation.navigate("TeamsScreen")
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
