import React, { useEffect, useRef, useState } from "react";

import cross from "../assets/img/cross-circle.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  language,
  margin,
  movieGenre,
  movieGenres,
  movieLan,
  movieReleaseDate,
  movieReleaseYear,
  movieSearchKey,
  movieSortBy,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { uiActions } from "../store/slices/ui";
import { movieActions } from "../store/slices/movie";

const SortNFilter = () => {
  const [genreArr, setGenreArr] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [genreMessage, setGenreMessage] = useState(
    "You can select multiple genres"
  );
  const [innerWidth, setInnerWidth] = useState(-1);
  const languages = useAppSelector(language);
  const genres = useAppSelector(movieGenres);
  const top = useAppSelector(margin);
  const dispatch = useAppDispatch();
  const asideRef = useRef(null);
  const yearRef = useRef(null);
  const searchKeyRef = useRef(null);
  const dateRef = useRef(null);
  const lanRef = useRef(null);
  const genreRef = useRef(null);
  const sortRef = useRef(null);
  const date = useAppSelector(movieReleaseDate);
  const sort = useAppSelector(movieSortBy);
  const genre = useAppSelector(movieGenre);
  const lan = useAppSelector(movieLan);
  const year = useAppSelector(movieReleaseYear);
  const searchKey = useAppSelector(movieSearchKey);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const loc = location.pathname.split("/");

  window.addEventListener("resize", () => setInnerWidth(window.innerWidth));

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    if (searchKeyRef.current) {
      (searchKeyRef.current as HTMLInputElement).value = searchKey;
    }
  }, [searchKey]);

  useEffect(() => {
    const width =
      parseInt(
        window.getComputedStyle(asideRef.current! as HTMLElement).width
      ) +
      10 +
      "px";
    dispatch(uiActions.setAsideWidth(width));
  }, [dispatch, innerWidth, pathname]);

  const srchBarClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    (searchKeyRef.current! as HTMLInputElement).classList.remove("error");
    setErrorMessage("");
  };
  const asideClickHandler = () => {
    (document.querySelector("aside")! as HTMLElement).classList.remove(
      "slide-aside"
    );
  };

  const clickHandler = (event: React.MouseEvent) => {
    if (loc.length < 4) {
      const date = (dateRef.current! as HTMLInputElement).value;
      const lan = (lanRef.current! as HTMLSelectElement).value;
      const sort = (sortRef.current! as HTMLSelectElement).value;
      dispatch(
        movieActions.setMovieChoices({
          movieGenre: genreArr,
          movieLan: lan,
          movieReleaseDate: date,
          movieSortBy: sort,
        })
      );
    }
    if (loc.length === 4) {
      const year = (yearRef.current! as HTMLInputElement).value;
      const searchKey = (searchKeyRef.current! as HTMLInputElement).value;
      if (!searchKey.trim()) {
        setErrorMessage("Please enter a search key");
        (searchKeyRef.current! as HTMLInputElement).classList.add("error");
        event.stopPropagation();
        return;
      }
      asideClickHandler();
      dispatch(
        movieActions.setSearchChoices({
          movieReleaseYear: year,
          movieSearchKey: searchKey,
        })
      );
    }
    navigate(`/${loc[1]}/1${loc[3] ? `/${loc[3]}` : ""}`);
  };

  const changeHandler = () => {
    const genre = (genreRef.current! as HTMLSelectElement).value;
    if (genre === "") {
      setGenreArr([]);
      setGenreMessage("You can select multiple genres");
    } else if (!genreArr.includes(genre))
      setGenreArr((state) => [...state, genre]);
  };

  const removeGenre = (event: React.MouseEvent) => {
    stopEventPropagation(event);
    const id = (event.target! as HTMLElement).dataset.genreId;
    if (id)
      setGenreArr((state) => {
        const arr: string[] = [];
        for (let i = 0; i < state.length; i++) {
          if (i !== parseInt(id)) arr.push(state[i]);
        }
        return [...arr];
      });
  };

  useEffect(() => {
    if (genreRef.current! as HTMLSelectElement) {
      if (genreArr.length === 0) {
        setGenreMessage("You can select multiple genres");
        (genreRef.current! as HTMLSelectElement).value = "";
      } else
        (genreRef.current! as HTMLSelectElement).value =
          genreArr[genreArr.length - 1];
    }
  }, [genreArr]);

  const stopEventPropagation = (event: React.MouseEvent) =>
    event.stopPropagation();

  return (
    <aside
      style={{ top, height: `calc(100vh - ${parseInt(top) + 120 + "px"})` }}
      ref={asideRef}
      onClick={asideClickHandler}
      onResize={changeWidth}
    >
      <h3>Filter and Sort</h3>
      {loc.length < 4 && (
        <div className="filter">
          <label htmlFor="date">Release Date</label>
          <input
            type="date"
            name="date"
            id="date"
            ref={dateRef}
            defaultValue={date ? date : ""}
            onClick={stopEventPropagation}
          />
        </div>
      )}
      {loc.length === 4 && (
        <div className="filter">
          <label htmlFor="year">Release year</label>
          <input
            type="text"
            name="year"
            id="year"
            ref={yearRef}
            defaultValue={year}
            onClick={stopEventPropagation}
          />
        </div>
      )}
      {loc.length === 4 && (
        <div className="filter">
          <label htmlFor="searchKey">Search key</label>
          <input
            type="text"
            name="searchKey"
            id="searchKey"
            ref={searchKeyRef}
            defaultValue={searchKey}
            onClick={srchBarClickHandler}
          />
          <p>{errorMessage}</p>
        </div>
      )}
      {loc.length < 4 && (
        <div className="filter">
          <label htmlFor="language">Language</label>
          <select
            name="language"
            id="language"
            defaultValue={lan ? lan : "en"}
            ref={lanRef}
            onClick={stopEventPropagation}
          >
            {languages.map((language) => (
              <option key={language.iso_639_1} value={language.iso_639_1}>
                {language.english_name}
              </option>
            ))}
          </select>
        </div>
      )}
      {loc.length < 4 && (
        <div className="filter">
          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            id="genre"
            defaultValue={genre?.length > 0 ? genre[0] : ""}
            ref={genreRef}
            onChange={changeHandler}
            onClick={stopEventPropagation}
          >
            <option value="">Choose</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {loc.length < 4 && (
        <div className="filter add-genres">
          <label className="selected-genres">Selected Genres</label>
          <div className="add-genre-items">
            {genreArr.length > 0 && genreArr[0] !== "All" ? (
              genreArr.map((current, idx) => (
                <div className="add-genre-item" key={idx}>
                  <h4>
                    {
                      genres.find((genre) => genre.id === parseInt(current))
                        ?.name
                    }
                  </h4>
                  <button onClick={removeGenre}>
                    <img
                      src={cross}
                      alt=" a cross sign"
                      data-genre-id={`${idx}`}
                    />
                  </button>
                </div>
              ))
            ) : (
              <div className="add-genre-item">
                <h4 style={{ color: "#ffa154" }}>{genreMessage}</h4>
              </div>
            )}
          </div>
        </div>
      )}
      {loc.length < 4 && (
        <div className="sort">
          <label htmlFor="sortBy">Sort by</label>
          <select
            name="sortBy"
            id="sortBy"
            defaultValue={sort ? sort : "popularity.desc"}
            ref={sortRef}
            onClick={stopEventPropagation}
          >
            <option value="popularity.asc">Popularity.asc</option>
            <option value="popularity.desc">Popularity.desc</option>
            <option value="revenue.asc">Revenue.asc</option>
            <option value="revenue.desc">Revenue.desc</option>
            <option value="primary_release_date.asc">Release date.asc</option>
            <option value="primary_release_date.desc">Release date.desc</option>
            <option value="vote_average.asc">Rating.asc</option>
            <option value="vote_average.desc">Rating.desc</option>
          </select>
        </div>
      )}
      <button className="btn-square" onClick={clickHandler}>
        <h4>Apply</h4>
      </button>
    </aside>
  );
};

export default SortNFilter;
