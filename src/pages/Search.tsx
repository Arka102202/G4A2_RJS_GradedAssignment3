import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  movieReleaseYear,
  movieSearchKey,
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

const Search = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const newMovies = useAppSelector(movies);
  const year = useAppSelector(movieReleaseYear);
  const key = useAppSelector(movieSearchKey);
  const [errorState, setErrorState] = useState(false);
  const [title, setTitle] = useState(`Searching for movies with key "${key}"`);

  useEffect(() => {
    setTitle(`Searching for movies with key "${key}"`);
  }, [key]);

  useEffect(() => {
    dispatch(movieActions.addMovies(tempResponseMovieArr));
    const tempFetch = async () => {
      try {
        const data = await fetchData(
          `/search/movie?query=${key}&include_adult=false&language=en-US&primary_release_year=${year}&page=${param.pageNumber}`
        );
        dispatch(movieActions.addMovies(data.results));
        data.total_results
          ? dispatch(uiActions.setPages(data.total_pages))
          : dispatch(uiActions.setPages(0));
      } catch (error: any) {
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
  }, [dispatch, key, param.pageNumber, year]);

  return (
    <>
      {newMovies.length > 0 && !errorState ? (
        <MovieLibrary
          movies={newMovies}
          style={{ padding: "2rem" }}
          title={title}
        />
      ) : (
        <ErrorElement style={{ marginLeft: "" }} />
      )}
    </>
  );
};

export default Search;
