import { GenresType, LangType } from "./MovieExtras";
import { ResponseMovie } from "./ResponseMovie";

// common action types:

export type StringAction = {
  type: string;
  payload: string;
};

export type NumberAction = {
  type: string;
  payload: number;
};

export type BooleanAction = {
  type: string;
  payload: boolean;
};

// movie info actions type

export type ShowType = {
  type: string;
  payload: { className: string; movieId: number };
};

// movies action type

export type moviesInitState = {
  movies: Array<ResponseMovie>;
  movieGenre: string[];
  movieLan: string;
  movieReleaseDate: string;
  movieSortBy: string;
  movieReleaseYear: string;
  movieSearchKey: string;
  popularEnglishMovies: Array<ResponseMovie>;
  popularBengaliMovies: Array<ResponseMovie>;
  popularHindiMovies: Array<ResponseMovie>;
  popularMarathiMovies: Array<ResponseMovie>;
  popularGujaratiMovies: Array<ResponseMovie>;
  popularTamilMovies: Array<ResponseMovie>;
  popularTeluguMovies: Array<ResponseMovie>;
  popularKannadaMovies: Array<ResponseMovie>;
  popularMalayalamMovies: Array<ResponseMovie>;
  popularPunjabiMovies: Array<ResponseMovie>;
  movieGenres: GenresType[];
  language: LangType[];
};

export type MovieAction = {
  type: string;
  payload: Array<ResponseMovie>;
};
export type MovieCriteriaAction1 = {
  type: string;
  payload: {
    movieGenre: string[];
    movieLan: string;
    movieReleaseDate: string;
    movieSortBy: string;
  };
};
export type MovieCriteriaAction2 = {
  type: string;
  payload: {
    movieReleaseYear: string;
    movieSearchKey: string;
  };
};
export type OptionsAction = {
  type: string;
  payload: [
    GenresType[],
    LangType[],
    Array<ResponseMovie>,
    Array<ResponseMovie>,
    Array<ResponseMovie>,
    Array<ResponseMovie>,
    Array<ResponseMovie>,
    Array<ResponseMovie>,
    Array<ResponseMovie>,
    Array<ResponseMovie>,
    Array<ResponseMovie>,
    Array<ResponseMovie>
  ];
};

// ui action types

export type SetMousePosAction = {
  type: string;
  payload: { x: number; y: number };
};
