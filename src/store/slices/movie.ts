import { createSlice } from "@reduxjs/toolkit";
import {
  MovieAction,
  MovieCriteriaAction1,
  MovieCriteriaAction2,
  OptionsAction,
  moviesInitState,
} from "../../models/ActionsType";
import { tempResponseMovieArr } from "../../services/utils";

const initialState: moviesInitState = {
  movies: tempResponseMovieArr,
  movieGenre: [],
  movieLan: "",
  movieReleaseDate: "",
  movieSortBy: "",
  movieReleaseYear: "",
  movieSearchKey: "",
  popularEnglishMovies: tempResponseMovieArr,
  popularBengaliMovies: tempResponseMovieArr,
  popularHindiMovies: tempResponseMovieArr,
  popularMarathiMovies: tempResponseMovieArr,
  popularGujaratiMovies: tempResponseMovieArr,
  popularTamilMovies: tempResponseMovieArr,
  popularTeluguMovies: tempResponseMovieArr,
  popularKannadaMovies: tempResponseMovieArr,
  popularMalayalamMovies: tempResponseMovieArr,
  popularPunjabiMovies: tempResponseMovieArr,
  movieGenres: [],
  language: [],
};

const movie = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies(state, action: MovieAction) {
      state.movies = action.payload;
    },
    clearMovies(state) {
      state.movies = [];
    },
    clearGenres(state) {
      state.movieGenre = [];
    },
    setMovieChoices(state, action: MovieCriteriaAction1) {
      state.movieGenre = action.payload.movieGenre;
      state.movieLan = action.payload.movieLan;
      state.movieReleaseDate = action.payload.movieReleaseDate;
      state.movieSortBy = action.payload.movieSortBy;
    },
    setSearchChoices(state, action: MovieCriteriaAction2) {
      state.movieReleaseYear = action.payload.movieReleaseYear;
      state.movieSearchKey = action.payload.movieSearchKey;
    },

    addMoviesInfo(state, action: OptionsAction) {
      state.movieGenres = action.payload[0];
      state.language = action.payload[1];
      state.popularEnglishMovies = action.payload[2];
      state.popularBengaliMovies = action.payload[3];
      state.popularHindiMovies = action.payload[4];
      state.popularMarathiMovies = action.payload[5];
      state.popularGujaratiMovies = action.payload[6];
      state.popularTamilMovies = action.payload[7];
      state.popularTeluguMovies = action.payload[8];
      state.popularKannadaMovies = action.payload[9];
      state.popularMalayalamMovies = action.payload[10];
      state.popularPunjabiMovies = action.payload[11];
    },
  },
});

export const movieActions = movie.actions;
export const movieReducer = movie.reducer;
