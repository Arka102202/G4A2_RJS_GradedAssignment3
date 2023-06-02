import { createSlice } from "@reduxjs/toolkit";
import { StringAction } from "../../models/ActionsType";

const initialState: {
  name: string;
  favourites: Array<number>;
} = {
  name: "",
  favourites: [],
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addName(state, action: StringAction) {
      state.name = action.payload;
    },
    addToFavourite(state, action) {
      state.favourites.push(action.payload);
      localStorage.removeItem(state.name);
      localStorage.setItem(state.name, JSON.stringify(state.favourites));
    },
    addAllToFavourite(state, action) {
      state.favourites.splice(0, state.favourites.length);
      state.favourites = action.payload;
    },
    removeFromFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (movieId) => movieId !== action.payload
      );
      localStorage.removeItem(state.name);
      localStorage.setItem(state.name, JSON.stringify(state.favourites));
    },
  },
});

export const userActions = user.actions;

export const userReducer = user.reducer;
