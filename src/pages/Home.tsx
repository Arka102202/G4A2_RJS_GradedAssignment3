import React from "react";
import Carousel from "../components/Carousel";
import {
  popularBengaliMovies,
  popularEnglishMovies,
  popularGujaratiMovies,
  popularHindiMovies,
  popularKannadaMovies,
  popularMalayalamMovies,
  popularMarathiMovies,
  popularPunjabiMovies,
  popularTamilMovies,
  popularTeluguMovies,
  useAppSelector,
} from "../store/store";

const Home = () => {
  const popularEnglish = useAppSelector(popularEnglishMovies);
  const popularBengali = useAppSelector(popularBengaliMovies);
  const popularHindi = useAppSelector(popularHindiMovies);
  const popularMarathi = useAppSelector(popularMarathiMovies);
  const popularGujarati = useAppSelector(popularGujaratiMovies);
  const popularTamil = useAppSelector(popularTamilMovies);
  const popularTelugu = useAppSelector(popularTeluguMovies);
  const popularKannada = useAppSelector(popularKannadaMovies);
  const popularMalayalam = useAppSelector(popularMalayalamMovies);
  const popularPunjabi = useAppSelector(popularPunjabiMovies);

  return (
    <>
      <Carousel endPoint="popularEnglish" movies={popularEnglish} />
      <Carousel endPoint="PopularBengali" movies={popularBengali} />
      <Carousel endPoint="PopularHindi" movies={popularHindi} />
      <Carousel endPoint="popularMarathi" movies={popularMarathi} />
      <Carousel endPoint="popularGujarati" movies={popularGujarati} />
      <Carousel endPoint="popularTamil" movies={popularTamil} />
      <Carousel endPoint="popularTelugu" movies={popularTelugu} />
      <Carousel endPoint="popularKannada" movies={popularKannada} />
      <Carousel endPoint="popularMalayalam" movies={popularMalayalam} />
      <Carousel endPoint="popularPunjabi" movies={popularPunjabi} />
    </>
  );
};

export default Home;
