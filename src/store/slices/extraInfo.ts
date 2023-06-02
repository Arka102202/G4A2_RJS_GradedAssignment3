import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
  style: { top: "", left: "" },
};

const extraInfo = createSlice({
  name: "show-extra-info",
  initialState,
  reducers: {
    showExtraInfo(state, action) {
      state.show = action.payload.show;
      state.message = action.payload.message;
      state.style = action.payload.style;
    },
  },
});

export const extraInfoActions = extraInfo.actions;

export const extraInfoReducer = extraInfo.reducer;
