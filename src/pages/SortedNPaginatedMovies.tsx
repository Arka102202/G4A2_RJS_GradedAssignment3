import React from "react";
import { Outlet } from "react-router-dom";
import SortNFilter from "../components/SortNFilter";
import PageNumber from "../components/PageNumber";
import { margin, useAppSelector } from "../store/store";

const SortedNPaginatedMovies = () => {
  const reduceHeight = useAppSelector(margin);

  return (
    <>
      <SortNFilter />
      <div
        className="movies-paginated"
        style={{
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: `calc(100vh - ${reduceHeight})`,
        }}
      >
        <Outlet />
        <PageNumber />
      </div>
    </>
  );
};

export default SortedNPaginatedMovies;
