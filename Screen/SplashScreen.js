import React from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";


function SplashScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>Loading...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default SplashScreen;
