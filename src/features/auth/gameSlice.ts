import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "../store";

const initialGameState: {
  inGame: boolean;
  name: string | null;
  room: Room | null;
} = {
  inGame: false,
  name: null,
  room: null,
};

export const gameSlice = createSlice({
  name: "game",

  initialState: initialGameState,

  reducers: {
    newGameState(state, action) {
      return {
        ...state,
        inGame: action.payload ? true : false,
        room: action.payload,
      };
    },
    startGame(state) {
      return {
        ...state,
        inGame: true,
      };
    },
    exitGame(state) {
      return initialGameState;
    },
    setName(state, action) {
      return {
        ...state,
        name: action.payload,
      };
    },
  },

  extraReducers: {},
});

export default gameSlice.reducer;
export const { newGameState, startGame, exitGame, setName } = gameSlice.actions;

export const selectRoom = (state: AppState) => state.game.room;
export const selectInGame = (state: AppState) => state.game.inGame;
export const selectName = (state: AppState) => state.game.name;
export const selectCurrentQuestion = (state: AppState) =>
  state.game.room?.questions[state.game.room.current_question ?? 0];
