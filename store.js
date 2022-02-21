import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth/authSlice";
import gameSlice from "./State/gameSlice";


export default configureStore({
  reducer: {
    auth: authReducer,
    game: gameSlice,
  },
});
