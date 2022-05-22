import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth/authSlice";
import forgotPasswordSlice from "./State/forgotPasswordSlice";
import gameSlice from "./State/gameSlice";
import teamDetailsSlice from "./State/teamDetailsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    game: gameSlice,
    teamDetails: teamDetailsSlice,
    forgotPassword: forgotPasswordSlice,
  },
});
