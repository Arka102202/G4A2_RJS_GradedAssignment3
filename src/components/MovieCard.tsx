import React, { useEffect, useState } from "react";
import moviePoster from "../assets/img/default-movie-poster.webp";
import { ResponseMovie } from "../models/ResponseMovie";
import { favourites, useAppDispatch, useAppSelector } from "../store/store";
import { useLocation } from "react-router-dom";
import { extraInfoActions } from "../store/slices/extraInfo";
import { clearExtraInfo, extraInfo } from "../services/extraInfoService";
import { userActions } from "../store/slices/user";
import { uiActions } from "../store/slices/ui";
import { infoActions } from "../store/slices/info";
import { movieInfoActions } from "../store/slices/movieInfo";
import { baseUrl } from "../services/api";
import { colorArr, genericMovie } from "../services/utils";

type PropsType = {
  newMovie: ResponseMovie;
  className: string;
};

export const addToFavFunc = (
  event: React.MouseEvent,
  newMovie: ResponseMovie,
  heartState: boolean,
  dispatch: any,
  setHeartState: React.Dispatch<React.SetStateAction<boolean>>,
  heartHoverHandler: (event: React.MouseEvent) => {
    payload: any;
    type: "show-extra-info/showExtraInfo";
  },
  mouseOutHandler: () => {
    payload: any;
    type: "show-extra-info/showExtraInfo";
  },
  endPont: string
) => {
  event.stopPropagation();
  if (newMovie?.id === -123) return;
  else if (!heartState) {
    dispatch(userActions.addToFavourite(newMovie?.id));
    setHeartState(true);
    dispatch(uiActions.changeInfoBarNumber());
    dispatch(infoActions.setShow(true));
    dispatch(infoActions.setMessage("Added to Favourite list"));
    heartHoverHandler(event);
  } else {
    dispatch(userActions.removeFromFavourite(newMovie?.id));
    setHeartState(false);
    dispatch(uiActions.changeInfoBarNumber());
    dispatch(infoActions.setShow(true));
    dispatch(infoActions.setMessage("Removed from Favourite list"));
    mouseOutHandler();
    if (endPont === "favourite") mouseOutHandler();
  }
};

const MovieCard: React.FC<PropsType> = ({ newMovie, className }) => {
  const [heartState, setHeartState] = useState(false);
  const dispatch = useAppDispatch();
  const favs = useAppSelector(favourites);
  const { pathname } = useLocation();
  const endPont = pathname.split("/")[2];
  const heartStyle = heartState ? { color: "#ef233c" } : { color: "#999" };
  const heartHoverHandler = (event: React.MouseEvent) =>
    dispatch(
      extraInfoActions.showExtraInfo(
        extraInfo(
          true,
          heartState ? "Remove from Favourites" : "Add to favourites",
          event,
          15,
          -120
        )
      )
    );
  const mouseOutHandler = () =>
    dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));

  const movie = {
    id: newMovie?.id,
    title: newMovie?.title,
    year: (() => {
      const date = new Date(newMovie?.release_date as string);
      return date.getFullYear() ? date.getFullYear() + "" : "";
    })(),
    releaseDate: newMovie?.release_date,
    poster: newMovie?.poster_path,
    rating: newMovie?.vote_average,
  };

  const openMovie = () => {
    if (movie.id && movie.id !== -123) {
      dispatch(movieInfoActions.setId(-123));
      dispatch(
        movieInfoActions.showInfo({ movieId: movie.id, className: "open-up" })
      );
    }
  };

  const addToFav = (event: React.MouseEvent) =>
    addToFavFunc(
      event,
      newMovie,
      heartState,
      dispatch,
      setHeartState,
      heartHoverHandler,
      mouseOutHandler,
      endPont
    );

  useEffect(() => {
    if (newMovie?.id === -123) setHeartState(false);
    else if (movie.id && favs.find((movieId) => movieId === movie.id))
      setHeartState(true);
  }, [favs, movie.id, newMovie?.id]);

  return (
    <div className={"card-movie " + className} onClick={openMovie}>
      <button
        className="ssss"
        onMouseOver={heartHoverHandler}
        onMouseOut={mouseOutHandler}
        onClick={addToFav}
        disabled={movie.id === -123}
      >
        <i style={heartStyle} className="fi fi-sr-heart"></i>
      </button>
      {movie.id === -123 && (
        <div className="card-movie__loading">
          <i className="fi fi-br-slash"></i>
        </div>
      )}

      <div className="card-movie__img">
        <img
          src={movie.poster ? baseUrl + movie.poster : moviePoster}
          alt="movie poster"
        />
      </div>
      <div className="card-movie__info">
        <h4>{movie.title ? movie.title : genericMovie.title} </h4>
        <div className="card-movie__info__extra">
          <span>
            <h4>
              {movie.year && `${movie.year ? movie.year : genericMovie.year}`}
            </h4>
          </span>
          <div
            className="card-movie__info__rating"
            style={{
              color:
                colorArr[
                  movie.rating
                    ? Math.floor(movie.rating)
                    : Math.floor(genericMovie.vote_average as number)
                ],
            }}
          >
            <strong>
              <h4>
                {movie.rating
                  ? movie.rating === 10
                    ? movie.rating.toFixed(0)
                    : movie.rating.toFixed(1)
                  : (genericMovie.vote_average as number)}
              </h4>
            </strong>
            <i className="fi fi-rs-star"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
