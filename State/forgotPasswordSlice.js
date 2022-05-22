import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FourBrainsAPI from "../axios/FourBrainsAPI";

const initialState = {
  forgotPassword: {
    resetToken: "",
    codeChecked: false,
  },
};

export const requestResetPassword = createAsyncThunk(
  "forgotPassword/requestResetPassword",

  async (data) => {
    try {
      const response = await FourBrainsAPI.post(
        "user/password/reset/request/",
        {
          user_string: data.username,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        return response.data.reset_token;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const changePassword = createAsyncThunk(
  "forgotPassword/changePassword",

  async (data) => {
    try {
      console.log(data);
      const response = await FourBrainsAPI.post(
        "user/password/reset/set/",
        {
          reset_code: data.resetCode,
          reset_token: data.resetToken,
          new_password: data.password,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const sendResetPasswordCode = createAsyncThunk(
  "forgotPassword/sendResetPasswordCode",

  async (data) => {
    try {
      const response = await FourBrainsAPI.post(
        "user/password/reset/code/check/",
        {
          reset_code: data.resetCode,
          reset_token: data.resetToken,
        }
      );
      if (response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
);

const ForgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setResetToken(state, action) {
      state.resetToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requestResetPassword.fulfilled, (state, action) => {
        state.forgotPassword.resetToken = action.payload;
      })
      .addCase(requestResetPassword.rejected, (state, action) => {
        state.forgotPassword.resetToken = "";
      })
      .addCase(sendResetPasswordCode.fulfilled, (state, action) => {
        state.forgotPassword.codeChecked = action.payload;
      })
      .addCase(sendResetPasswordCode.rejected, (state, action) => {
        state.forgotPassword.codeChecked = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.forgotPassword.codeChecked = !action.payload;
      });
  },
});

export const selectResetToken = (state) =>
  state.forgotPassword.forgotPassword.resetToken;

export const selectCodeChecked = (state) =>
  state.forgotPassword.forgotPassword.codeChecked;

export const { setResetToken } = ForgotPasswordSlice.actions;

export default ForgotPasswordSlice.reducer;
