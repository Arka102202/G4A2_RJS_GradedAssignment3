import React from "react";
import logo from "../assets/img/logo.webp";
import { clearExtraInfo, extraInfo } from "../services/extraInfoService";
import { extraInfoActions } from "../store/slices/extraInfo";
import { useAppDispatch } from "../store/store";

type PropType = {};
const LogoTitle: React.FC<PropType> = () => {
  const dispatch = useAppDispatch();

  const mouseHoverHandler = (event: React.MouseEvent) =>
    dispatch(
      extraInfoActions.showExtraInfo(extraInfo(true, "FilmFusion", event, 5, 5))
    );
  const mouseOutHandler = () =>
    dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));
  return (
    <div className="logo-title">
      <div className="logo-box">
        <img src={logo} alt=" logo with the alphabets F and F" />
      </div>
      <a href="/">
        <h3
          className="title"
          onMouseOver={mouseHoverHandler}
          onMouseOut={mouseOutHandler}
        >
          FilmFusion
        </h3>
      </a>
    </div>
  );
};

export default LogoTitle;
