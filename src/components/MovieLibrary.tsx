import React, { FC } from "react";
import { ResponseMovie } from "../models/ResponseMovie";
import {
  asideWidth,
  language,
  movieLan,
  movieReleaseDate,
  movieSortBy,
  useAppSelector,
} from "../store/store";
import MovieCard from "./MovieCard";

type PropsType = {
  movies: ResponseMovie[];
  style: any;
  title: string;
};

const MovieLibrary: FC<PropsType> = ({ movies, style, title }) => {
  const marginLeft = useAppSelector(asideWidth);
  const lanArr = useAppSelector(language);
  const lan = useAppSelector(movieLan);
  const date = useAppSelector(movieReleaseDate);
  const sort = useAppSelector(movieSortBy);
  let modifiedTitle = "",
    _1stPhrase,
    _2ndPhrase;
  const movieCards = movies.map((movie, id) => (
    <MovieCard key={id} className="" newMovie={movie} />
  ));

  if (title === "library" && lan) {
    const category = sort.split(".")[0];
    const order = sort.split(".")[1];
    let position = 1;
    switch (category) {
      case "popularity":
        _1stPhrase = "Popular";
        break;
      case "revenue":
        _1stPhrase = "Most earned";
        position = 2;
        break;
      case "vote_average":
        _1stPhrase = "Top rated";
        break;
      default:
        _1stPhrase = "";
    }

    if (_1stPhrase) _1stPhrase += `(${order}) `;

    modifiedTitle = _1stPhrase;
    _2ndPhrase = lanArr.find((item) => item.iso_639_1 === lan);

    modifiedTitle += _2ndPhrase?.english_name + " movie " + title;

    if (date) {
      const currentTime = Date.now() - 1203232021;
      const targetDate = new Date(date);
      if (targetDate.getTime() >= currentTime) {
        const arr = modifiedTitle.split(" ");
        for (let i = 0; i < position; i++) arr.shift();
        modifiedTitle = "Upcoming " + arr.join(" ");
      }
    }
  }

  if (!lan && title === "library") modifiedTitle = "Movies " + title;
  else if (!lan) modifiedTitle += title;

  return (
    <>
      <h2
        className="movie-library-title"
        style={{
          marginLeft,
          ...style,
        }}
      >
        {`${modifiedTitle ? modifiedTitle : title}`}
      </h2>
      <div
        className="movie-library"
        style={{
          marginLeft,
          ...style,
        }}
      >
        {movieCards}
      </div>
    </>
  );
};

export default MovieLibrary;
