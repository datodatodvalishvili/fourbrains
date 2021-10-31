import * as React from "react";
import * as SecureStore from "expo-secure-store";
import HomeScreen from "./Screen/HomeScreen";
import HostScreen from "./Screen/HostScreen";
import PlayerScreen from "./Screen/PlayerScreen";
import SignInScreen from "./Screen/SignInScreen";
import SplashScreen from "./Screen/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { View, TextInput, Button, ViewBase } from "react-native";
import axios from "axios";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          console.log(action.token);
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        if (!userToken) {
          userToken = null;
        }
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        axios
          .post("https://tifliser.com/api/user/login/", {
            username: data.username,
            password: data.password,
          })
          .then(function (response) {
            // handle success
            if (response.data.token) {
              SecureStore.setItemAsync("userToken", response.data.token);
              dispatch({ type: "SIGN_IN", token: response.data.token });
            } else alert("Server error");
          })
          .catch(function (error) {
            // handle error
            alert(error.message);
          });
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
        SecureStore.setItemAsync("userToken", "");
      },
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return (
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "Sign in",
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="PlayerScreen">
              {(props) => (
                <PlayerScreen {...props} userToken={state.userToken} />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
