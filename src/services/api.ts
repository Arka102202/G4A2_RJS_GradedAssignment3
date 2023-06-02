import axios from "axios";

export const apiUrl = "https://api.themoviedb.org/3";
export const baseUrl = "https://image.tmdb.org/t/p/original";
export const baseUrl780 = "https://image.tmdb.org/t/p/w780";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODU5NTI5YWJjNGQ1NmYxYjZiNzY0NTFmOTAyMzU5YiIsInN1YiI6IjY0NjQzY2IwZDA1YTAzMDE3MGMxNzc1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5oH4RICLrWpKIEFIr-cBcy2_q89AWhJixX8f1oIuNjg",
  },
};

export const fetchData = async (endPoint: string) => {
  const { data } = await axios.get(apiUrl + endPoint, options);
  return data;
};

export const urls = {
  popularEnglish:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=en",
  PopularBengali:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=bn",
  PopularHindi:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=hi",
  popularMarathi:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=mr",
  popularGujarati:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=gu",
  popularTamil:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=ta",
  popularTelugu:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=te",
  popularKannada:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=kn",
  popularMalayalam:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=ml",
  popularPunjabi:
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_original_language=pa",
  genres: "/genre/movie/list?language=en",
  language: "/configuration/languages",
};

export const messages = { ERR_BAD_REQUEST: "404 not found" };
