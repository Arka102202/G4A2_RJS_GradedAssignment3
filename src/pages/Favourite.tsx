import React, { useEffect, useState } from "react";
import {
  favourites,
  movies,
  useAppDispatch,
  useAppSelector,
  username,
} from "../store/store";
import { ResponseMovie } from "../models/ResponseMovie";
import { movieActions } from "../store/slices/movie";
import { fetchData } from "../services/api";
import { infoActions } from "../store/slices/info";
import MovieLibrary from "../components/MovieLibrary";
import ErrorElement from "../components/ErrorElement";

const Favourites = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(username);
  const favs = useAppSelector(favourites);
  const [errorState, setErrorState] = useState(false);
  const newMovies = useAppSelector(movies);
  useEffect(() => {
    if (favs) {
      let tempMovies: ResponseMovie[] = [];
      if (favs.length === 0) {
        dispatch(movieActions.addMovies(tempMovies));
        return;
      }
      const tempFetch = async (idx: number) => {
        try {
          const data = await fetchData(`/movie/${idx}?language=en-US`);
          tempMovies = [...tempMovies, data];
          if (favs.length === tempMovies.length)
            dispatch(movieActions.addMovies(tempMovies));
        } catch (error) {
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
      favs.forEach((id) => tempFetch(id));
    }
  }, [dispatch, userName, favs]);

  return (
    <>
      {newMovies.length > 0 && !errorState ? (
        <MovieLibrary
          movies={newMovies}
          style={{
            width: "calc(100vw - 4vw)",
            justifyItems: "center",
            marginRight: "0",
            marginLeft: "0",
            padding: "2rem",
          }}
          title={`${userName.split(" ")[0]}'s favourite movies`}
        />
      ) : (
        <ErrorElement style={{ marginLeft: "0" }} />
      )}
    </>
  );
};

export default Favourites;
