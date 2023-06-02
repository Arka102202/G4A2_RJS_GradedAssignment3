import React from "react";

import avatar from "../assets/img/avater-1.jpg";
import { Cast } from "../models/Cast";
import { useAppDispatch } from "../store/store";
import { extraInfoActions } from "../store/slices/extraInfo";
import { clearExtraInfo, extraInfo } from "../services/extraInfoService";
import { baseUrl } from "../services/api";
import { genericCast } from "../services/utils";

type PropsType = {
  cast: Cast;
  className: string;
};

const CastCard: React.FC<PropsType> = ({ cast, className }) => {
  const dispatch = useAppDispatch();

  const heartHoverHandler = (event: any) =>
    dispatch(
      extraInfoActions.showExtraInfo(extraInfo(true, cast.name, event, 0, 0))
    );
  const mouseOutHandler = () =>
    dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));

  return (
    <div
      className={`card-cast ${className}`}
      onMouseOver={heartHoverHandler}
      onMouseOut={mouseOutHandler}
    >
      {cast.name === "John Dow" && (
        <div className="card-cast__loading">
          <i className="fi fi-br-slash"></i>
        </div>
      )}
      <div className="card-cast__img">
        <img
          src={cast.profilePic ? baseUrl + cast.profilePic : avatar}
          alt="movie poster"
        />
      </div>
      <div className="card-cast__info">
        <p>{cast.name ? cast.name : genericCast.name}</p>
        <p className="card-cast__info__as">
          {cast.role ? cast.role : genericCast.role}
        </p>
      </div>
    </div>
  );
};

export default CastCard;
