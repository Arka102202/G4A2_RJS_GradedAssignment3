import { createSlice } from "@reduxjs/toolkit";
import { BooleanAction, NumberAction, SetMousePosAction, StringAction } from "../../models/ActionsType";

const initialState = {
  margin: "2px",
  asideWidth: "2px",
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2,
  pages: 2,
  updateMousePosition: false,
  infoBarNumber: 0,
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMargin(state, action: StringAction) {
      state.margin = action.payload;
    },
    setMousePosition(state, action: SetMousePosAction) {
      state.mouseX = action.payload.x;
      state.mouseY = action.payload.y;
    },
    setUpdateMousePosition(state, action: BooleanAction) {
      state.updateMousePosition = action.payload;
    },
    setAsideWidth(state, action: StringAction) {
      state.asideWidth = action.payload;
    },
    setPages(state, action: NumberAction) {
      state.pages = action.payload > 500 ? 500 : action.payload;
    },
    changeInfoBarNumber(state) {
      state.infoBarNumber += 1;
    },
  },
});

export const uiActions = ui.actions;

export const uiReducer = ui.reducer;
