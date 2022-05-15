import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth/authSlice";
import gameSlice from "./State/gameSlice";
import teamDetailsSlice from "./State/teamDetailsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    game: gameSlice,
    teamDetails: teamDetailsSlice,
  },
});
