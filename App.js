import React from "react";

import { Provider } from "react-redux";
import store from "./store";
import NavComponent from "./Components/NavComponent";

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <NavComponent />
    </Provider>
  );
}

/*

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
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
          console.log(2);
          SecureStore.setItemAsync("userToken", "");
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

      try {
        FourBrainsAPI.get(`user/get-details/`, {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        })
          .then(function (response) {
            //dispatch({ type: "SIGN_OUT" });
          })
          .catch(function (error) {
            dispatch({ type: "SIGN_OUT" });
          });
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      } catch (error) {}
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data, setErrorMsg) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        FourBrainsAPI.post("user/login/", {
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
            setErrorMsg("User or password is incorrect!");
          });
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data, setErrorMsg) => {
        FourBrainsAPI.post("user/register/", {
          username: data.username,
          password: data.password,
          email: data.email,
          firstname: data.firstName,
          lastname: data.lastName,
        })
          .then(function (response) {
            // handle success
            console.log(response.data);
            if (response.data.success) {
              return;
            } else setErrorMsg(response.data.message);
          })
          .catch(function (error) {
            setErrorMsg("Server error!");
          });
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
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {state.userToken == null ? (
            // No token found, user isn't signed in
            <>
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
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : (
            // User is signed in
            <>
              <Stack.Screen name="HomeScreen">
                {(props) => (
                  <HomeScreen {...props} userToken={state.userToken} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="TeamCreationScreen"
                component={TeamCreationScreen}
              />
              <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
              <Stack.Screen name="HostScreen" component={HostScreen} />
              <Stack.Screen name="TeamsScreen" component={TeamsScreen} />
              <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
*/
