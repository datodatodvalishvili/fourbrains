// React Native Axios – To Make HTTP API call in React Native
// https://aboutreact.com/react-native-axios/
import React, { useEffect } from "react";
import HomeScreen from "../Screen/HomeScreen";
import TeamCreationScreen from "../Screen/TeamCreationScreen";
import CreateGameScreen from "../Screen/CreateGameScreen";
import MainScreen from "../Screen/MainScreen";
import HostScreen from "../Screen/HostScreen";
import TeamsScreen from "../Screen/TeamsScreen";
import BattlePickScreen from "../Screen/BattlePickScreen";
import PlayerScreen from "../Screen/PlayerScreen";
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from "../Screen/SignUpScreen";
import GameOverScreen from "../Screen/GameOverScreen";
import LobbyScreen from "../Screen/LobbyScreen";
import SplashScreen from "../Screen/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectState, tryLocalSignin } from "../Auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

function NavComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryLocalSignin());
  }, []);

  const Stack = createNativeStackNavigator();

  const authState = useSelector(selectState);

  return (
    <NavigationContainer>
      {authState.userToken === null ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFBA01",
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        >
          {authState.isLoading === true ? (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFBA01",
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlayerScreen"
            component={PlayerScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="GameOverScreen"
            component={GameOverScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="TeamsScreen"
            component={TeamsScreen}
            options={{ title: "Select Team" }}
          />
          <Stack.Screen
            name="BattlePickScreen"
            component={BattlePickScreen}
            options={{ title: "Select Battle" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default NavComponent;
