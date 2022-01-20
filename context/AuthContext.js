import createDataContext from "./createDataContext";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const authReducer = (state, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
  }
};

const tryLocalSignin = (dispatch) => async () => {
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
        SecureStore.setItemAsync("userToken", "");
        dispatch({ type: "SIGN_OUT" });
      });
    dispatch({ type: "RESTORE_TOKEN", token: userToken });
  } catch (error) {}
};

const signup = (dispatch) => async (data, setErrorMsg) => {
  FourBrainsAPI.post("user/register/", {
    username: data.username,
    password: data.password,
    email: data.email,
    firstname: data.firstName,
    lastname: data.lastName,
  })
    .then(function (response) {
      // handle success
      if (response.data.success) {
        return;
      } else setErrorMsg(response.data.message);
    })
    .catch(function (error) {
      setErrorMsg("Server error!");
    });
};

const signin = (dispatch) => async (data, setErrorMsg) => {
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
};

const signout = (dispatch) => async () => {
  const navigation = useNavigation();
  SecureStore.setItemAsync("userToken", "");
  dispatch({ type: "SIGN_OUT" });
  navigation.navigate("SignIn");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, tryLocalSignin },
  {
    isLoading: true,
    isSignout: false,
    userToken: null,
  }
);
