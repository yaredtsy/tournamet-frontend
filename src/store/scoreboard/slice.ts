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
      state.isLoading = true;
    },

    getTournamentSuccess: (
      state,
      action: PayloadAction<TournamentType | null>
    ) => {
      state.tournament = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    getTournamentFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = action.payload;
    },

    getPlayersStart: (state, action: PayloadAction<TournamentType>) => {
      state.isLoading = true;
    },

    getPlayersSuccess: (state, action: PayloadAction<PlayersType[]>) => {
      state.isLoading = false;
      state.error = null;
      state.players = action.payload;
    },

    getPlayersFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    joinTournamentStart: (
      state,
      action: PayloadAction<{
        player: PlayersJoinType;
        tournament: TournamentType;
      }>
    ) => {
      state.isLoading = true;
    },

    joinTournamentSuccess: (state, action: PayloadAction<PlayersJoinType>) => {
      state.isLoading = false;
      state.players?.push({ score: 0, ...action.payload });
    },

    joinTournamentFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatePlayer: (state, action: PayloadAction<PlayersType>) => {
      const index: number | undefined = state.players?.findIndex(
        (player) => player.id === action.payload.id
      );

      if (state.players && index != null) {
        state.players[index] = action.payload;
      }
    },
  },
});

const scoreboardReducer = scoreBoardSlice.reducer;
const scoreboardAction = scoreBoardSlice.actions;

export { scoreboardReducer, scoreboardAction };
