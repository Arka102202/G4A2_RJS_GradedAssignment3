import React, { useEffect, useMemo, useRef, useState } from "react";

import rightArrow from "../assets/img/angle-circle-right.png";
import leftArrow from "../assets/img/angle-circle-left.png";
import moviePoster from "../assets/img/default-movie-poster.webp";
import movieBackdrop from "../assets/img/movie-big-card-bg.webp";
import heartRed from "../assets/img/heart-red.png";
import heartBlack from "../assets/img/heart.png";
import {
  colorArr,
  genericCasts,
  genericMovie,
  tempDirectors,
  tempWriters,
} from "../services/utils";
import {
  MovieBigCardClassName,
  MovieId,
  favourites,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { useLocation } from "react-router-dom";
import { addToFavFunc } from "./MovieCard";
import { movieInfoActions } from "../store/slices/movieInfo";
import { baseUrl, baseUrl780, fetchData } from "../services/api";
import { Cast } from "../models/Cast";
import { responseCast, responseCrew } from "../models/MovieExtras";
import { infoActions } from "../store/slices/info";
import { extraInfoActions } from "../store/slices/extraInfo";
import { clearExtraInfo, extraInfo } from "../services/extraInfoService";
import CastCard from "./CastCard";
import { formatDate } from "../services/utils";

const MovieBigCard = () => {
  const [heartState, setHeartState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [movie, SetMovie] = useState(genericMovie);
  const [casts, SetCasts] = useState(genericCasts);
  const [directors, SetDirectors] = useState(tempDirectors);
  const [writers, SetWriters] = useState(tempWriters);
  const [leftBtnHiddenState, setLeftBtnHiddenState] = useState(false);
  const [rightBtnHiddenState, setRightBtnHiddenState] = useState(false);
  const heartStyle = heartState ? heartRed : heartBlack;
  let leftBtnCLassName = leftBtnHiddenState
    ? `hid-arrow-button btn-circular btn-slider btn-slider-left`
    : `btn-circular btn-slider btn-slider-left`;
  let rightBtnCLassName = rightBtnHiddenState
    ? `hid-arrow-button btn-circular btn-slider btn-slider-right`
    : `btn-circular btn-slider btn-slider-right`;
  const id = useAppSelector(MovieId);
  const favs = useAppSelector(favourites);
  const className = useAppSelector(MovieBigCardClassName);
  const dispatch = useAppDispatch();
  const castContainer = useRef(null);
  const { pathname } = useLocation();
  const endPont = pathname.split("/")[2];
  const [castsLen, setCastsLen] = useState(0);
  const castCards = useMemo(() => {
    const tempCards = [];
    const maxLen = casts.length;
    const len = casts.length > maxLen ? maxLen : casts.length;
    setCastsLen(len);
    for (let i = 0; i < len; i++) {
      if (len === 1)
        tempCards.push(
          <CastCard
            cast={casts[i]}
            key={i}
            className={`first-cast first-cast-${i} last-cast-${i}`}
          />
        );
      else if (i === 0)
        tempCards.push(
          <CastCard
            cast={casts[i]}
            key={i}
            className={`first-cast first-cast-${i}`}
          />
        );
      else if (i === len - 1) {
        tempCards.push(
          <CastCard
            cast={casts[i]}
            key={i}
            className={`last-cast last-cast-${i}`}
          />
        );
      } else tempCards.push(<CastCard cast={casts[i]} key={i} className="" />);
    }
    return tempCards;
  }, [casts]);

  const run = useRef(-1);

  const closeHandler = () => {
    SetCasts(genericCasts);
    dispatch(movieInfoActions.setId(-123));
    dispatch(movieInfoActions.setClassName("close-down"));
  };

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

  const addToFav = (event: React.MouseEvent) =>
    addToFavFunc(
      event,
      movie,
      heartState,
      dispatch,
      setHeartState,
      heartHoverHandler,
      mouseOutHandler,
      endPont
    );

  const leftClickHandler = () =>
    ((castContainer.current! as HTMLElement).scrollLeft -= 400);

  const rightClickHandler = () =>
    ((castContainer.current! as HTMLElement).scrollLeft += 400);

  useEffect(() => {
    if (id === -123) setHeartState(false);
    else if (id && favs.find((movieId) => movieId === id)) setHeartState(true);
    else setHeartState(false);
  }, [favs, id]);

  useEffect(() => {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Escape")
        dispatch(movieInfoActions.setClassName("close-down"));
    });
    if (id === -123) {
      SetMovie(genericMovie);
      return;
    }
    const tempFetch = async () => {
      try {
        const data = await fetchData(
          `/movie/${id}?append_to_response=credits&language=en-US`
        );
        let tempCast: Cast[] = [];
        for (
          let i = 0;
          i < (data?.credits?.cast as Array<responseCast>).length;
          i++
        )
          tempCast = [
            ...tempCast,
            {
              name: data?.credits?.cast[i].name,
              role: data?.credits?.cast[i].character,
              profilePic: data?.credits?.cast[i].profile_path,
            },
          ];

        const namesD: string[] = [];
        const namesW: string[] = [];
        for (
          let i = 0;
          i < (data?.credits?.crew as Array<responseCrew>).length;
          i++
        ) {
          if (data?.credits?.crew[i].job === "Director")
            namesD.push(data?.credits?.crew[i].name);
          else if (data?.credits?.crew[i].job === "Writer")
            namesW.push(data?.credits?.crew[i].name);
        }
        setTimeout(() => {
          SetMovie(data);
          SetCasts(tempCast);
          SetDirectors(namesD);
          SetWriters(namesW);
        }, 50);
      } catch (error: any) {
        dispatch(infoActions.setShow(true));
        dispatch(
          infoActions.setMessage(
            "something went wrong. Please Try again later."
          )
        );
        console.error(error);
        setErrorState(true);
      }
    };
    tempFetch();
  }, [dispatch, id]);

  useEffect(() => {
    className === "open-up"
      ? document.documentElement.classList.add("stop-scroll")
      : document.documentElement.classList.remove("stop-scroll");
  }, [className]);

  useEffect(() => {
    if (
      casts[0]?.name !== "John Dow" &&
      (run.current === -1 || run.current !== castsLen)
    ) {
      run.current = castsLen;
      const obsCallbackLeft = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) setLeftBtnHiddenState(true);
        else setLeftBtnHiddenState(false);
      };
      const obsCallbackRight = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) setRightBtnHiddenState(true);
        else setRightBtnHiddenState(false);
      };
      const Options1 = {
        root: document.querySelector(`.cast-slider__casts-container`),
        threshold: 1,
      };
      const Options2 = {
        root: document.querySelector(`.cast-slider__casts-container`),
        threshold: 1,
      };
      const observerFirst = new IntersectionObserver(obsCallbackLeft, Options1);
      document.querySelector(`.first-cast-0`) &&
        observerFirst.observe(document.querySelector(`.first-cast-0`)!);
      const observerLast = new IntersectionObserver(obsCallbackRight, Options2);
      document.querySelector(`.last-cast-${casts.length - 1}`) &&
        observerLast.observe(
          document.querySelector(`.last-cast-${casts.length - 1}`)!
        );
    }
  }, [casts, castsLen]);

  useEffect(() => {
    if (castContainer.current! as HTMLElement)
      (castContainer.current! as HTMLElement).scrollLeft = 0;
    if (document.querySelector(".movie-info-wrapper")! as HTMLElement)
      (
        document.querySelector(".movie-info-wrapper")! as HTMLElement
      ).scrollTop = 0;
  }, [casts]);

  return (
    <>
      <div className={`movie-big-card ${className}`}>
        <article
          className="movie"
          style={{
            backgroundImage: `linear-gradient(
      45deg,
      rgba(35, 35, 35, 0.65) 0%,
      rgba(35, 35, 35, 0.85) 100%
    ),
    url(${
      movie.backdrop_path ? baseUrl + movie.backdrop_path : movieBackdrop
    })`,
          }}
        >
          <button className="btn-cross" onClick={closeHandler}>
            <i className="fi fi-sr-circle-xmark"></i>
          </button>
          {errorState ? (
            <h1>something went wrong</h1>
          ) : (
            <div className="movie-info-wrapper">
              <div className="movie-poster-details">
                <div className="movie__poster">
                  <img
                    src={
                      movie.poster_path
                        ? baseUrl780 + movie.poster_path
                        : moviePoster
                    }
                    alt=""
                  />
                </div>
                <div className="movie__details">
                  <div className="movie__details__title-year">
                    <h1>
                      {movie.title}
                      {`${
                        movie.release_date &&
                        `(${movie.release_date.split("-")[0]})`
                      }`}
                    </h1>
                  </div>
                  <div className="movie__details__tagline">
                    <p>{movie.tagline}</p>
                  </div>
                  <div className="movie__details__date-lan-gen-len">
                    <h3>
                      {formatDate(movie.release_date)}(
                      {movie.original_language.toUpperCase()})
                    </h3>
                    <h3>.</h3>
                    <h3>
                      {movie.genres?.at(0)?.name}
                      {`${movie.genres?.at(1)?.name ? "," : ""}`}
                      {movie.genres?.at(1)?.name}
                      {`${movie.genres?.at(2)?.name ? "," : ""}`}
                      {movie.genres?.at(2)?.name}
                    </h3>
                    <h3>.</h3>
                    <h3>{movie.runtime}mins</h3>
                  </div>
                  <div className="movie__details__rating-fav-btn">
                    <button
                      className="heart-btn"
                      onClick={addToFav}
                      onMouseOver={heartHoverHandler}
                      onMouseOut={mouseOutHandler}
                    >
                      <img src={heartStyle} alt="" />
                    </button>
                    <div
                      className="movie__details__rating-fav-btn__rating"
                      style={{
                        color:
                          colorArr[Math.floor(movie?.vote_average as number)],
                      }}
                    >
                      <strong>
                        <h4
                          style={{
                            color:
                              colorArr[
                                Math.floor(movie?.vote_average as number)
                              ],
                          }}
                        >
                          {movie.vote_average
                            ? movie.vote_average === 10
                              ? movie.vote_average.toFixed(0)
                              : movie.vote_average.toFixed(1)
                            : genericMovie.vote_average}
                        </h4>
                      </strong>
                      <i className="fi fi-rs-star"></i>
                    </div>
                  </div>
                  <div className="movie__details__overview">
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                  </div>
                  {directors.length > 0 && (
                    <div className="movie__details__directors">
                      <h3>Directors:</h3>
                      <div className="movie__details__directors__info">
                        <p>{directors?.at(0)}</p>
                        <p>{directors?.at(1)}</p>
                        <p>{directors?.at(2)}</p>
                      </div>
                    </div>
                  )}
                  {writers.length > 0 && (
                    <div className="movie__details__writers">
                      <h3>Writers:</h3>
                      <div className="movie__details__writers__info">
                        <p>{writers?.at(0)}</p>
                        <p>{writers?.at(1)}</p>
                        <p>{writers?.at(2)}</p>
                      </div>
                    </div>
                  )}
                  <div className="movie__details__casts"></div>
                </div>
              </div>
              {casts.length > 0 && (
                <section className={`cast-slider cast-slider-${id}`}>
                  <h2>
                    Casts: <span>(total {`${casts.length}`})</span>
                  </h2>
                  <button
                    className={leftBtnCLassName}
                    onClick={leftClickHandler}
                  >
                    <img src={leftArrow} alt="" />
                  </button>
                  <div
                    className="cast-slider__casts-container"
                    ref={castContainer}
                  >
                    {castCards}
                  </div>
                  <button
                    className={rightBtnCLassName}
                    onClick={rightClickHandler}
                  >
                    <img src={rightArrow} alt="" />
                  </button>
                </section>
              )}
            </div>
          )}
        </article>
      </div>
    </>
  );
};

export default MovieBigCard;
