import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import RootMovies from "./pages/RootMovies";
import Movies from "./pages/Movies";
import {
  updateMousePosition,
  useAppDispatch,
  useAppSelector,
} from "./store/store";
import SortedNPaginatedMovies from "./pages/SortedNPaginatedMovies";
import Search from "./pages/Search";
import Favourites from "./pages/Favourite";
import { uiActions } from "./store/slices/ui";

function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const updateMouse = useAppSelector(updateMousePosition);

  window.addEventListener("mousemove", (event: MouseEvent) => {
    if (updateMouse)
      dispatch(
        uiActions.setMousePosition({ x: event.clientX, y: event.clientY })
      );
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        {
          path: "movies",
          element: <RootMovies />,
          children: [
            { path: "home", element: <Home /> },
            {
              path: ":pageNumber",
              element: <SortedNPaginatedMovies />,
              children: [
                { index: true, element: <Movies /> },
                { path: "search", element: <Search /> },
              ],
            },
            { path: "favourite", element: <Favourites /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
