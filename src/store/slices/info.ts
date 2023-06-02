import { createSlice } from "@reduxjs/toolkit";
import { BooleanAction, StringAction } from "../../models/ActionsType";

const initialState = {
  show: false,
  message: "",
};

const info = createSlice({
  name: "router",
  initialState,
  reducers: {
    setShow(state, action: BooleanAction) {
      state.show = action.payload;
    },
    setMessage(state, action: StringAction) {
      state.message = action.payload;
    },
  },
});

export const infoActions = info.actions;

export const infoReducer = info.reducer;
