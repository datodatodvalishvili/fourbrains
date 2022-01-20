import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import * as SecureStore from "expo-secure-store";

const initialState = {
  isLoading: true,
  userToken: null,
};

export const signin = createAsyncThunk(
  "auth/signin",
  async (data, setErrorMsg) => {
    try {
      const response = await FourBrainsAPI.post("user/login/", {
        username: data.username,
        password: data.password,
      });
      if (response.data.token) {
        SecureStore.setItemAsync("userToken", response.data.token);
        return response.data.token;
      } else alert("Server error");
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(error.response.data);
      throw new Error("Auth error");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signin",
  async (data, setErrorMsg) => {
    try {
      const response = await FourBrainsAPI.post("user/register/", {
        username: data.username,
        password: data.password,
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
      });

      // handle success
      if (response.data.success) {
        FourBrainsAPI.post("user/login/", {
          username: data.username,
          password: data.password,
        })
          .then(function (response) {
            // handle success
            if (response.data.token) {
              SecureStore.setItemAsync("userToken", response.data.token);
              return response.data.token;
            } else alert("Server error");
          })
          .catch(function (error) {
            setErrorMsg("User or password is incorrect!");
          });
      } else setErrorMsg(response.data.message);
    } catch (error) {
      setErrorMsg("Server error!");
    }
    throw new Error("Auth error");
  }
);

export const tryLocalSignin = createAsyncThunk("auth/signin", async () => {
  try {
    userToken = await SecureStore.getItemAsync("userToken");
    if (!userToken) {
      userToken = null;
    }
  } catch (e) {}
  try {
    FourBrainsAPI.get(`user/get-details/`, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    })
      .then(function (response) {})
      .catch(function (error) {
        SecureStore.setItemAsync("userToken", "");
        throw new Error("Auth error");
      });
    return userToken;
  } catch (error) {}
  throw new Error("Auth error");
});

export const signout = createAsyncThunk("auth/singout", async (thunkAPI) => {
  SecureStore.setItemAsync("userToken", "");
  return;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signin.pending, (state, action) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(signin.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.userToken = action.payload;
        console.log("fulfilled");
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.userToken = null;
        //console.log(action);
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userToken = null;
      });
  },
});

export const selectState = (state) => state.auth;

export default authSlice.reducer;
