// We type this template constantly because we are often building components.
import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";
// https://image.tmdb.org/t/p/original/8j12tohv1NBZNmpU93f47sAKBbw.jpg
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); // This is called a hook, and we are init an empty arr

  //  A snippet of code which runs based on a specific condition
  //  when this row compotent loads, I want to make a request to TDB api and be able to pull the information when the row loads, the image and from those speicific catagories
  //  if [], run once when the row loads, and dont run it again

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // the reason we want them in a container is so we can scroll through them.
  console.log(movies);
  /* container -> posters "films" */
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row__poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
