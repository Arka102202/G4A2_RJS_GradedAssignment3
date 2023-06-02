import { createSlice } from "@reduxjs/toolkit";
import { NumberAction, ShowType, StringAction } from "../../models/ActionsType";

const initialState = {
  movieId: -123,
  className: "close-down",
};

const movieInfo = createSlice({
  name: "movieInfo",
  initialState,
  reducers: {
    setId(state, action: NumberAction) {
      state.movieId = action.payload;
    },
    setClassName(state, action: StringAction) {
      state.className = action.payload;
    },
    showInfo(state, action: ShowType) {
      state.movieId = action.payload.movieId;
      state.className = action.payload.className;
    },
  },
});

export const movieInfoActions = movieInfo.actions;

export const movieInfoReducer = movieInfo.reducer;
