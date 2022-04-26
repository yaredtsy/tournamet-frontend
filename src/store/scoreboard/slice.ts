import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore/lite";

const initialState: ScoreBoardType = {
  tournament: null,
  players: null,
  error: null,
  isLoading: false,
};

export const scoreBoardSlice = createSlice({
  name: "scoreBoard",
  initialState,
  reducers: {
    getTournamentStart: (state, action: PayloadAction<string>) => {
      state.isLoading = true
    },
    getTournamentSuccess: (state, action: PayloadAction<TournamentType>) => {
      state.tournament = action.payload
      state.isLoading = false;
      state.error = null
    },
    getTournamentFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = true
      state.error = action.payload
    },
    getPlayersStart: (state, action: PayloadAction<string>) => {},
    getPlayersSuccess: (state, action: PayloadAction<string>) => {},
    getPlayersFailed: (state, action: PayloadAction<string>) => {},
  },
});

const scoreboardReducer = scoreBoardSlice.reducer;
const scoreboardAction = scoreBoardSlice.actions;

export { scoreboardReducer, scoreboardAction };
