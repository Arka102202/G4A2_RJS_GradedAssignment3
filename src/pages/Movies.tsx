import React, { FC, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import {
  movieGenre,
  movieLan,
  movieReleaseDate,
  movieSortBy,
  movies,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { movieActions } from "../store/slices/movie";
import { tempResponseMovieArr } from "../services/utils";
import { fetchData } from "../services/api";
import { uiActions } from "../store/slices/ui";
import { infoActions } from "../store/slices/info";
import MovieLibrary from "../components/MovieLibrary";
import ErrorElement from "../components/ErrorElement";

type PropsType = {};

const Movies: FC<PropsType> = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const newMovies = useAppSelector(movies);
  const date = useAppSelector(movieReleaseDate);
  const sort = useAppSelector(movieSortBy);
  const genre = useAppSelector(movieGenre);
  const lan = useAppSelector(movieLan);
  const [errorState, setErrorState] = useState(false);
  useEffect(() => {
    dispatch(movieActions.addMovies(tempResponseMovieArr));
    const tempFetch = async () => {
      try {
        const data = await fetchData(
          `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
            param.pageNumber
          }${date ? `&primary_release_date.gte=${date}` : ""}${
            sort ? `&sort_by=${sort}` : ""
          }${
            genre.length > 0
              ? `&with_genres=${genre.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    (genre.length > 1 ? currentValue + "%2C" : currentValue),
                  ""
                )}`
              : ""
          }${lan ? `&with_original_language=${lan}` : ""}`
        );
        dispatch(movieActions.addMovies(data.results));
        data.total_results
          ? dispatch(uiActions.setPages(data.total_pages))
          : dispatch(uiActions.setPages(0));
      } catch (error) {
        dispatch(infoActions.setShow(true));
        dispatch(
          infoActions.setMessage(
            "something went wrong. Please Try again later."
          )
        );
        console.error(error);
        dispatch(uiActions.setPages(0));
        setErrorState(true);
      }
    };
    tempFetch();
  }, [date, dispatch, genre, lan, param.pageNumber, sort]);

  
  return (
    <>
      {newMovies.length > 0 && !errorState ? (
        <MovieLibrary
          movies={newMovies}
          style={{ padding: "2rem" }}
          title={`library`}
        />
      ) : (
        <ErrorElement style={{ marginLeft: "" }} />
      )}
    </>
  );
};

export default Movies;
