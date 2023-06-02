import React from "react";
import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import InfoBar from "../components/InfoBar";
import ExtraInfo from "../components/ExtraInfo";
import MovieXlCard from "../components/MovieXlCard";

const Root = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <InfoBar />,
        document.getElementById("info")! as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ExtraInfo />,
        document.getElementById("info")! as HTMLElement
      )}
      {ReactDOM.createPortal(
        <MovieXlCard />,
        document.getElementById("movie-info")! as HTMLElement
      )}
      <Outlet />
    </>
  );
};

export default Root;
