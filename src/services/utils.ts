import { Cast } from "../models/Cast";
import { ResponseMovie } from "../models/ResponseMovie";

// movie utils
export const responseMovie: ResponseMovie = {
  id: -123,
  backdrop_path: "",
  original_language: "",
  original_title: "",
  overview: "",
  poster_path: "",
  release_date: "",
  title: "",
  vote_average: 0,
};

export const genericCast: Cast = {
  name: "John Dow",
  profilePic: "",
  role: "in as Unknown",
};

export const genericCasts = [
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
  genericCast,
];

export const genericMovie: ResponseMovie = {
  id: -123,
  title: "Title of the Movie",
  backdrop_path: "",
  original_language: "English",
  original_title: "",
  overview:
    "In a world plagued by amnesia, a young musician, Iris, discovers a haunting melody that awakens lost memories in those who hear it. Joined by a mysterious traveler, they embark on a quest to uncover the source of the melody and restore forgotten histories, all while evading a shadowy organization",
  poster_path: "",
  release_date: "2023-12-12",
  adult: false,
  genre_ids: [],
  popularity: 0,
  video: false,
  vote_average: 0,
  vote_count: 0,
  genres: [
    { id: 12, name: "Action" },
    { id: 12, name: "Drama" },
    { id: 12, name: "Romance" },
  ],
  runtime: 120,
  tagline: "something important in oneline",
};

export const tempResponseMovieArr = [
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
  responseMovie,
];

export const tempDirectors = ["unknown1", "unknown2", "unknown3"];
export const tempWriters = ["unknown1", "unknown2", "unknown3"];

//  date utils:
export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  } catch (err) {
    return dateString;
  }
};

// color utils:
export const colorArr = [
  "#861d1d",
  "#9d2222",
  "#e03131",
  "#f08c00",
  "#f08c00",
  "#f08c00",
  "#2f9e44",
  "#37b24d",
  "#40c057",
  "#51cf66",
  "#fff",
];

// section info:
export const sectionTitles = {
  popularEnglish: "Popular english movies",
  PopularBengali: "Popular bengali movies",
  PopularHindi: "Popular hindi movies",
  popularMarathi: "Popular marathi movies",
  popularGujarati: "Popular gujarati movies",
  popularTamil: "Popular tamil movies",
  popularTelugu: "Popular telugu movies",
  popularKannada: "Popular kannada movies",
  popularMalayalam: "Popular malayalam movies",
  popularPunjabi: "Popular punjabi movies",
};

export const sectionLan = {
  popularEnglish: "en",
  PopularBengali: "bn",
  PopularHindi: "hi",
  popularMarathi: "mr",
  popularGujarati: "gu",
  popularTamil: "ta",
  popularTelugu: "te",
  popularKannada: "kn",
  popularMalayalam: "ml",
  popularPunjabi: "pa",
};
