import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { API_KEY, BASE_URL } from "../api/config";
import Spinner from "../utils/spinner";
import { MediaCard, PageLayout } from "../components";
import { Row, Col } from "react-bootstrap";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
export default function Genres() {
  const { id } = useParams();
  const [genreList, setGenreList] = useState([]);
  const [newGenreList, setNewGenreList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const { genres } = useFetchData("genre/movie/list");
  const filterGenreTitle = genres.filter((genre) => genre.id === id);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore);

  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsFetching(false);
    }, 5000);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}&
          with_genres=${id}`
        );
        const movieList = response.data.results;
        setGenreList(movieList);
        setNewGenreList([...newGenreList, ...genreList]);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    fetchData();
  }, [id, page, genreList, newGenreList]);

  useEffect(() => {
    window.scrollTo({ top: "0" });
  }, [id]);

  if (!genreList) return <Spinner />;
  return (
    <PageLayout
      error={error}
      heading={`${filterGenreTitle.map((title) => title.name)} Movies`}
    >
      <Row className="gy-2">
        {[...newGenreList, ...genreList].map((movie, index) => (
          <Col xs={6} md={3} xl={2} key={index}>
            <MediaCard {...movie} />
          </Col>
        ))}
      </Row>
      {isFetching && <Spinner />}
    </PageLayout>
  );
}
