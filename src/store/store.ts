import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userReducer } from "./slices/user";
import { movieReducer } from "./slices/movie";
import { infoReducer } from "./slices/info";
import { extraInfoReducer } from "./slices/extraInfo";
import { uiReducer } from "./slices/ui";
import { movieInfoReducer } from "./slices/movieInfo";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    router: infoReducer,
    showExtraInfo: extraInfoReducer,
    ui: uiReducer,
    movieInfo: movieInfoReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const movies = (state: RootState) => state.movie.movies;
export const movieGenre = (state: RootState) => state.movie.movieGenre;
export const movieLan = (state: RootState) => state.movie.movieLan;
export const movieReleaseDate = (state: RootState) =>
  state.movie.movieReleaseDate;
export const movieSortBy = (state: RootState) => state.movie.movieSortBy;
export const movieReleaseYear = (state: RootState) =>
  state.movie.movieReleaseYear;
export const movieSearchKey = (state: RootState) => state.movie.movieSearchKey;
export const popularEnglishMovies = (state: RootState) =>
  state.movie.popularEnglishMovies;
export const popularBengaliMovies = (state: RootState) =>
  state.movie.popularBengaliMovies;
export const popularHindiMovies = (state: RootState) =>
  state.movie.popularHindiMovies;
export const popularMarathiMovies = (state: RootState) =>
  state.movie.popularMarathiMovies;
export const popularGujaratiMovies = (state: RootState) =>
  state.movie.popularGujaratiMovies;
export const popularTamilMovies = (state: RootState) =>
  state.movie.popularTamilMovies;
export const popularTeluguMovies = (state: RootState) =>
  state.movie.popularTeluguMovies;
export const popularKannadaMovies = (state: RootState) =>
  state.movie.popularKannadaMovies;
export const popularMalayalamMovies = (state: RootState) =>
  state.movie.popularMalayalamMovies;
export const popularPunjabiMovies = (state: RootState) =>
  state.movie.popularPunjabiMovies;
export const movieGenres = (state: RootState) => state.movie.movieGenres;
export const language = (state: RootState) => state.movie.language;

export const showInfo = (state: RootState) => state.router.show;
export const messageInfo = (state: RootState) => state.router.message;

export const showExtraInfo = (state: RootState) => state.showExtraInfo.show;
export const messageExtraInfo = (state: RootState) =>
  state.showExtraInfo.message;
export const styleExtraInfo = (state: RootState) => state.showExtraInfo.style;

export const username = (state: RootState) => state.user.name;
export const favourites = (state: RootState) => state.user.favourites;

export const margin = (state: RootState) => state.ui.margin;
export const asideWidth = (state: RootState) => state.ui.asideWidth;
export const mouseX = (state: RootState) => state.ui.mouseX;
export const mouseY = (state: RootState) => state.ui.mouseY;
export const pages = (state: RootState) => state.ui.pages;
export const infoBarNumber = (state: RootState) => state.ui.infoBarNumber;
export const updateMousePosition = (state: RootState) =>
  state.ui.updateMousePosition;

export const MovieId = (state: RootState) => state.movieInfo.movieId;
export const MovieBigCardClassName = (state: RootState) =>
  state.movieInfo.className;
