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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {authState.userToken === null ? (
          <>
            {authState.isLoading === true ? (
              <>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </>
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen
              name="TeamCreationScreen"
              component={TeamCreationScreen}
            />
            <Stack.Screen
              name="CreateGameScreen"
              component={CreateGameScreen}
            />
            <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
            <Stack.Screen name="HostScreen" component={HostScreen} />
            <Stack.Screen name="TeamsScreen" component={TeamsScreen} />
            <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
            <Stack.Screen
              name="BattlePickScreen"
              component={BattlePickScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavComponent;
