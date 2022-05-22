import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FourBrainsAPI from "../axios/FourBrainsAPI";
import * as SecureStore from "expo-secure-store";

const initialState = {
  isLoading: true,
  userToken: null,
  userInfo: null,
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
        return { token: response.data.token, user: response.data.user };
      } else alert("Server error");
    } catch (error) {
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

      console.log(response.data);

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
              return response.data;
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

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, setErrorMsg) => {
    try {
      console.log(data);
      const response = await FourBrainsAPI.post(
        "user/update/",
        {
          email: data.email,
          firstname: data.firstName,
          lastname: data.lastName,
          phone_prefix: "+995",
          phone: data.phone,
          show_fullname_4b: 1,
          username: data.username,
        },
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
      );

      console.log(response.data);

      // handle success
      if (response.data.success) {
        return data;
      } else setErrorMsg(response.data.message);
    } catch (error) {
      console.log(error.data);
      setErrorMsg("Server error!");
    }
    throw new Error("Auth error");
  }
);

export const tryLocalSignin = createAsyncThunk(
  "auth/signin",
  async (data, { getState }) => {
    try {
      const state = getState();
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
      return { token: userToken, user: response.data.user_data };
    } catch (error) {}
    throw new Error("Auth error");
  }
);

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
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userToken = action.payload.token;
        state.userInfo = action.payload.user;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.userToken = null;
        state.userInfo = null;
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userToken = null;
        state.userInfo = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo.first_name = action.payload.firstName;
        state.userInfo.last_name = action.payload.lastName;
        state.userInfo.email = action.payload.email;
      });
  },
});

export const selectState = (state) => state.auth;
export const selectUserInfo = (state) => state.auth.userInfo;

export default authSlice.reducer;
