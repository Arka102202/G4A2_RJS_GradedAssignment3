import React, { FC, useEffect, useRef, useState } from "react";

import rightArrow from "../assets/img/angle-circle-right.png";
import leftArrow from "../assets/img/angle-circle-left.png";
import rightAngleArrow from "../assets/img/angle-right.png";

import { useNavigate } from "react-router-dom";
import { ResponseMovie } from "../models/ResponseMovie";
import { sectionLan, sectionTitles } from "../services/utils";
import { useAppDispatch } from "../store/store";
import { movieActions } from "../store/slices/movie";
import { extraInfoActions } from "../store/slices/extraInfo";
import { clearExtraInfo, extraInfo } from "../services/extraInfoService";
import MovieCard from "./MovieCard";

type PropsType = {
  endPoint: keyof typeof sectionTitles;
  movies: ResponseMovie[];
};

const Carousel: FC<PropsType> = ({ endPoint, movies }) => {
  const movieCards = [];
  const dispatch = useAppDispatch();
  const movieContainer = useRef(null);
  const carouselTitle = useRef(null);
  const carouselHeadingArrow = useRef(null);
  const [leftBtnHiddenState, setLeftBtnHiddenState] = useState(false);
  const [rightBtnHiddenState, setRightBtnHiddenState] = useState(false);
  const navigate = useNavigate();
  let leftBtnCLassName = leftBtnHiddenState
    ? `hid-arrow-button btn-circular btn-slider btn-slider-left btn-slider-${endPoint}`
    : `btn-circular btn-slider btn-slider-left btn-slider-${endPoint}`;
  let rightBtnCLassName = rightBtnHiddenState
    ? `hid-arrow-button btn-circular btn-slider btn-slider-right btn-slider-${endPoint}`
    : `btn-circular btn-slider btn-slider-right btn-slider-${endPoint}`;

  // event handlers

  const navigateOnClick = () => {
    dispatch(
      movieActions.setMovieChoices({
        movieGenre: [],
        movieLan: sectionLan[endPoint],
        movieReleaseDate: "",
        movieSortBy: "popularity.desc",
      })
    );
    dispatch(movieActions.clearMovies());
    navigate("/movies/1");
  };

  const navigateToNewOnClick = () => {
    const date = new Date(Date.now());

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    // Assemble the formatted date string
    const formattedDate = year + "-" + month + "-" + day;

    dispatch(
      movieActions.setMovieChoices({
        movieGenre: [],
        movieLan: sectionLan[endPoint],
        movieReleaseDate: formattedDate,
        movieSortBy: "primary_release_date.asc",
      })
    );
    dispatch(movieActions.clearMovies());
    navigate("/movies/1");
  };

  const leftClickHandler = () =>
    ((movieContainer.current! as HTMLElement).scrollLeft -= 400);

  const rightClickHandler = () =>
    ((movieContainer.current! as HTMLElement).scrollLeft += 400);

  const mouseHoverHandlerMovie = (event: React.MouseEvent) => {
    (carouselHeadingArrow.current! as HTMLElement).classList.add(
      "animate-heading-link"
    );

    dispatch(
      extraInfoActions.showExtraInfo(extraInfo(true, "View All", event, 15, 15))
    );
  };

  const mouseOutHandlerMovie = () => {
    (carouselHeadingArrow.current! as HTMLElement).classList.remove(
      "animate-heading-link"
    );

    dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));
  };
  const mouseHoverHandlerSoon = (event: React.MouseEvent) =>
    dispatch(
      extraInfoActions.showExtraInfo(
        extraInfo(true, "See All upcoming Movies", event, 15, -70)
      )
    );

  const mouseOutHandlerSoon = () =>
    dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));

  // intersection observer

  useEffect(() => {
    const obsCallbackLeft = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (movieContainer.current)
          (movieContainer.current! as HTMLElement).scrollLeft = 0;
        setLeftBtnHiddenState(true);
      } else setLeftBtnHiddenState(false);
    };
    const obsCallbackRight = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (movieContainer.current)
          (movieContainer.current! as HTMLElement).scrollLeft = 3000;
        setRightBtnHiddenState(true);
      } else setRightBtnHiddenState(false);
    };

    const Options = {
      root: null,
      threshold: 0,
    };
    const observerFirst = new IntersectionObserver(obsCallbackLeft, Options);
    document.querySelector(`.first-movie-${endPoint}`) &&
      observerFirst.observe(
        document.querySelector(`.first-movie-${endPoint}`)!
      );
    const observerLast = new IntersectionObserver(obsCallbackRight, Options);
    document.querySelector(`.card-movie-dummy-last-${endPoint}`) &&
      observerLast.observe(
        document.querySelector(`.card-movie-dummy-last-${endPoint}`)!
      );
  }, [endPoint]);

  for (let i = 0; i < movies?.length; i++) {
    if (i === 0)
      movieCards.push(
        <MovieCard
          newMovie={movies[i]}
          key={i}
          className={`first-movie-${endPoint}`}
        />
      );
    else if (i % 2 === 0) {
      movieCards.push(<MovieCard newMovie={movies[i]} key={i} className="" />);
    } else
      movieCards.push(<MovieCard newMovie={movies[i]} key={i} className="" />);
  }

  return (
    <section className="movie-slider">
      <div className="movie-slider__heading ">
        <button
          className="movie-slider__heading__title-link "
          onMouseOver={mouseHoverHandlerMovie}
          onMouseOut={mouseOutHandlerMovie}
          onClick={navigateOnClick}
        >
          <h3 ref={carouselTitle}>{sectionTitles[endPoint]}</h3>
          <img
            src={rightAngleArrow}
            alt="right angle arrow"
            className="movie-slider__heading__link"
            ref={carouselHeadingArrow}
          />
        </button>
        <button
          className="movie-slider__heading__soon "
          onClick={navigateToNewOnClick}
          onMouseOver={mouseHoverHandlerSoon}
          onMouseOut={mouseOutHandlerSoon}
        >
          <h3>Upcoming</h3>
        </button>
      </div>
      <button className={leftBtnCLassName} onClick={leftClickHandler}>
        <img src={leftArrow} alt="" />
      </button>
      <div
        className={`movie-slider__movies-container  movie-slider__movies-container-${endPoint}`}
        ref={movieContainer}
      >
        {movieCards}
        <button
          className={`card-movie card-movie-dummy-last card-movie-dummy-last-${endPoint}`}
          onClick={navigateOnClick}
        >
          <h4>View All</h4>
          <i className="fi fi-sr-arrow-right"></i>
        </button>
      </div>
      <button className={rightBtnCLassName} onClick={rightClickHandler}>
        <img src={rightArrow} alt="" />
      </button>
    </section>
  );
};

export default Carousel;
