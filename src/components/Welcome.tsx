import React from "react";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { extraInfoActions } from "../store/slices/extraInfo";
import { userActions } from "../store/slices/user";
import { infoActions } from "../store/slices/info";
import { clearExtraInfo, extraInfo } from "../services/extraInfoService";
import LogoTitle from "./LogoTitle";
import rightArrow from "../assets/img/right.png";

const Welcome = () => {
  const nameIpRef = React.useRef<HTMLInputElement>(null);
  const [className, setClassName] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));
    if (!nameIpRef.current!.value.trim()) setClassName("error");
    else {
      dispatch(userActions.addName(nameIpRef.current!.value.trim()));
      setClassName("");
      return navigate("/movies/home");
    }
  };

  const focusHandler = () => {
    setClassName("");
    dispatch(infoActions.setShow(false));
  };

  const hoverHandler = (event: React.MouseEvent) =>
    dispatch(
      extraInfoActions.showExtraInfo(
        extraInfo(true, "Get Started", event, 35, 0)
      )
    );
  const mouseOutHandler = () =>
    dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));

  return (
    <div className="home">
      <LogoTitle />
      <main>
        <h1 className="home__title">FilmFusion .</h1>
        <div className="p-box">
          <p>
            The ultimate haven for movie enthusiasts. <br /> Discover, explore,
            and store your favorite movies with our sleek and stylish app.
            Unleash your cinematic passion, unravel captivating plots, and
            curate your personalized collection. Dive into a realm of
            enchantment, where the silver screen comes alive at your fingertips.
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="name">
            <h3>Please enter your name to start</h3>
          </label>
          <div className="input-btn">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="enter your name"
              ref={nameIpRef}
              className={className}
              onFocus={focusHandler}
            />
            <button
              className="btn-circular"
              onClick={clickHandler}
              onMouseOver={hoverHandler}
              onMouseOut={mouseOutHandler}
            >
              <img src={rightArrow} alt="" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
