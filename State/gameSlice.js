import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameState: "IDLE_START",
  answer: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState(state, action) {
      state.gameState = action.payload;
      console.log(action.payload);
    },
    setTimeUp(state) {
      state.answer = "";
      state.gameState = "IDLE";
    },
    setAnswer(state, action) {
      state.answer = action.payload;
    },
  },
});

export const selectGameState = (state) => state.game.gameState;
export const selectAnswer = (state) => state.game.answer;

export const { setGameState, setTimeUp, setAnswer } = gameSlice.actions;

export default gameSlice.reducer;
