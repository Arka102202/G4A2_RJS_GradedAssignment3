import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  margin,
  useAppDispatch,
  useAppSelector,
  username,
} from "../store/store";
import { userActions } from "../store/slices/user";
import { fetchData, urls } from "../services/api";
import { movieActions } from "../store/slices/movie";
import { infoActions } from "../store/slices/info";
import Header from "../components/Header";
import { LangType } from "../models/MovieExtras";

const RootMovies = () => {
  const userName = useAppSelector(username);
  const outletTopMargin = useAppSelector(margin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userName) {
      const item = localStorage.getItem(userName);
      if (item) dispatch(userActions.addAllToFavourite(JSON.parse(item)));
      const tempFetch = async () => {
        try {
          const data = await Promise.all([
            //genres
            fetchData(urls.genres),
            //language
            fetchData(urls.language),
            //popular
            fetchData(urls.popularEnglish),
            //popular bengali
            fetchData(urls.PopularBengali),
            //popular hindi
            fetchData(urls.PopularHindi),
            //popular Marathi
            fetchData(urls.popularMarathi),
            //popular Gujarati
            fetchData(urls.popularGujarati),
            //popular Tamil
            fetchData(urls.popularTamil),
            //popular Telugu
            fetchData(urls.popularTelugu),
            //popular Kannada
            fetchData(urls.popularKannada),
            //popular Malayalam
            fetchData(urls.popularMalayalam),
            //popular Punjabi
            fetchData(urls.popularPunjabi),
          ]);
          setTimeout(() => {
            dispatch(
              movieActions.addMoviesInfo([
                data[0].genres,
                (data[1] as Array<LangType>).sort((l1, l2) => {
                  if (l1.english_name > l2.english_name) return 1;
                  else if (l1.english_name === l2.english_name) return 0;
                  else return -1;
                }),
                data[2].results,
                data[3].results,
                data[4].results,
                data[5].results,
                data[6].results,
                data[7].results,
                data[8].results,
                data[9].results,
                data[10].results,
                data[11].results,
              ])
            );
          }, 250);
        } catch (error) {
          console.error(error);
        }
      };
      tempFetch();
      return;
    }
    dispatch(infoActions.setShow(true));
    dispatch(infoActions.setMessage("Please enter your name first."));
    navigate("/");
  }, [dispatch, navigate, userName]);
  return (
    <div className="movies-root">
      <Header />
      <div
        className="movies-root__outlet"
        style={{ marginTop: outletTopMargin }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default RootMovies;
