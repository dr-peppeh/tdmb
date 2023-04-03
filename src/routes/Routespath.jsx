import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../components";
import {
  Genres,
  Home,
  MovieId,
  Person,
  PersonId,
  Popular,
  Toprated,
} from "../pages";
import Error from "../components/Error";

export default function Routespath() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="movies/genres/:id" element={<Genres />} />
        <Route path="movies/popular" element={<Popular />} />
        <Route path="movies/top_rated" element={<Toprated />} />
        <Route path="person/popular" element={<Person />} />
        <Route path="movie/:movie_id" element={<MovieId />} />
        <Route path="person/:person_id" element={<PersonId />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
