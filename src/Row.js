// We type this template constantly because we are often building components.
import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
// https://image.tmdb.org/t/p/original/8j12tohv1NBZNmpU93f47sAKBbw.jpg
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); // This is called a hook, and we are init an empty arr
  const [trailerUrl, setTrailerUrl] = useState("");
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
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://developers.google.com/youtube/?v=player_parameters
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  /* container -> posters "films" */
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row__poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
