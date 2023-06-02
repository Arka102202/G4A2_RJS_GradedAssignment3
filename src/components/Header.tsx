import React, { useEffect, useRef, useState } from "react";
import LogoTitle from "./LogoTitle";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  margin,
  useAppDispatch,
  useAppSelector,
  username,
} from "../store/store";
import { clearExtraInfo, extraInfo } from "../services/extraInfoService";
import { extraInfoActions } from "../store/slices/extraInfo";
import { uiActions } from "../store/slices/ui";
import { movieActions } from "../store/slices/movie";

const Header = () => {
  const [srchBarCls, setSrchBarCla] = useState("search-bar hidden");
  const headerRef = useRef(null);
  const navLinkRef = useRef(null);
  const keyRef = useRef(null);
  const srchBox = useRef(null);
  const navigate = useNavigate();
  const outletTopMargin = useAppSelector(margin);
  const user = useAppSelector(username);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const endPoint = pathname.split("/")[2];

  const mouseHoverHandlerSrch = (event: any) =>
    dispatch(
      extraInfoActions.showExtraInfo(
        extraInfo(true, "search movies", event, 15, -70)
      )
    );

  const mouseOutHandlerSrch = () =>
    dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));

  const mouseHoverHandlerFav = (event: React.MouseEvent) =>
    dispatch(
      extraInfoActions.showExtraInfo(
        extraInfo(true, "Goto ❤️ list", event, 15, 15)
      )
    );

  const mouseOutHandlerFav = () => mouseOutHandlerSrch();

  const clickHandlerSearch = (event: React.MouseEvent) => {
    if ((srchBox.current! as HTMLElement).classList.contains("hidden"))
      setSrchBarCla("search-bar");
    else setSrchBarCla("search-bar hidden");
  };

  const clickHandlerCross = () => setSrchBarCla("search-bar hidden");

  const onClickNav = (event: React.MouseEvent) => {
    if ((event.target! as HTMLElement).classList.contains("fi-br-search")) {
      (navLinkRef.current! as HTMLDivElement).classList.remove("drop-down");
      (document.querySelector("aside")! as HTMLElement)?.classList.remove(
        "slide-aside"
      );
    } else if (
      (event.target! as HTMLElement).classList.contains("fi-br-menu-burger")
    ) {
      setSrchBarCla("search-bar hidden");
      (document.querySelector("aside")! as HTMLElement)?.classList.remove(
        "slide-aside"
      );
    } else if (
      (event.target! as HTMLElement).classList.contains(
        "fi-sr-settings-sliders"
      )
    ) {
      (navLinkRef.current! as HTMLDivElement).classList.remove("drop-down");
      setSrchBarCla("search-bar hidden");
    } else {
      (navLinkRef.current! as HTMLDivElement).classList.remove("drop-down");
      setSrchBarCla("search-bar hidden");
      (document.querySelector("aside")! as HTMLElement)?.classList.remove(
        "slide-aside"
      );
    }
  };

  const openLinks = (event: React.MouseEvent) => {
    (navLinkRef.current! as HTMLDivElement).classList.toggle("drop-down");
  };

  const openSortNFilter = (event: React.MouseEvent) => {
    (document.querySelector("aside")! as HTMLElement).classList.toggle(
      "slide-aside"
    );
  };

  const searchForMovie = (event: any) => {
    if (event.code === "Enter") searchHandler();
  };

  const searchHandler = () => {
    const key = (keyRef.current! as HTMLInputElement).value.trim();

    if (!key) {
      (keyRef.current! as HTMLInputElement).classList.add("error");
      (keyRef.current! as HTMLInputElement).placeholder =
        "Please enter a key word";
      return;
    }
    dispatch(
      movieActions.setSearchChoices({
        movieReleaseYear: "",
        movieSearchKey: key,
      })
    );
    dispatch(movieActions.clearMovies());
    navigate("/movies/1/search");
    setSrchBarCla("search-bar hidden");
  };

  const srchBarClickHandler = () =>
    (keyRef.current! as HTMLInputElement).classList.remove("error");

  useEffect(() => {
    const height =
      parseInt(
        window.getComputedStyle(headerRef.current! as HTMLElement).height
      ) +
      10 +
      "px";
    dispatch(uiActions.setMargin(height));
  }, [dispatch]);

  useEffect(() => {
    document.getElementById("search-key")?.focus();
  }, [srchBarCls]);

  return (
    <>
      <header ref={headerRef} onClick={onClickNav}>
        <LogoTitle />
        <nav>
          <div className="nav-links" ref={navLinkRef}>
            <NavLink
              to={"/movies/home"}
              className={"nav-link"}
              onClick={onClickNav}
            >
              <h4>Home</h4>
            </NavLink>
            <NavLink
              to={"/movies/1"}
              className={"nav-link"}
              onClick={onClickNav}
            >
              <h4>Movies</h4>
            </NavLink>
            <NavLink
              onClick={onClickNav}
              onMouseOver={mouseHoverHandlerFav}
              onMouseOut={mouseOutHandlerFav}
              to={"/movies/favourite"}
              className={"nav-link"}
            >
              <h4>
                {user.split(" ")[0]}'s
                <br /> favourites
              </h4>
            </NavLink>
          </div>
          <button
            className="nav-links-btn nav-links-btn-burger"
            onClick={openLinks}
          >
            <i className="fi fi-br-menu-burger"></i>
          </button>
          {endPoint !== "favourite" && endPoint !== "home" && (
            <button className="nav-links-btn" onClick={openSortNFilter}>
              <i className="fi fi-sr-settings-sliders"></i>
            </button>
          )}
          <button
            className="nav-search-btn"
            onClick={clickHandlerSearch}
            onMouseOver={mouseHoverHandlerSrch}
            onMouseOut={mouseOutHandlerSrch}
          >
            <i className="fi fi-br-search"></i>
          </button>
        </nav>
      </header>
      <div
        className={srchBarCls}
        style={{ top: outletTopMargin }}
        ref={srchBox}
      >
        <input
          type="text"
          name="key"
          id="search-key"
          placeholder="search for movie"
          onKeyDown={searchForMovie}
          onClick={srchBarClickHandler}
          ref={keyRef}
        />
        <button onClick={searchHandler} className="btn-square">
          <i className="fi fi-br-search"></i>
        </button>
        <button className="btn-square" onClick={clickHandlerCross}>
          <i className="fi fi-br-cross"></i>
        </button>
      </div>
    </>
  );
};

export default Header;
