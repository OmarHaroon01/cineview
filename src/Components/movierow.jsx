import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";

function MovieRow(props) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      //console.log(props);

      let response = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          props.movie.id +
          "?api_key=87b82e1ce0bcea0c95a22cdc1e04617e"
      );
      //console.log(response);
      setMovie(response["data"]);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="col-12 mb-4 p-0">
        <div
          className="row py-2 rounded"
          style={{ backgroundColor: "#1b1f23" }}
        >
          <div className="col-lg-2 col-md-3 col-sm-4 col-5 p-0 d-flex justify-content-center">
            <img
              src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              style={{
                maxHeight: "200px",
              }}
              className="p-3"
            ></img>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-7 my-auto ps-0 pe-4">
            <h5 className="fw-bold">{movie.title}</h5>
            <div className="mb-2">
              <small className="me-2 fw-bold">
                {movie.release_date?.substring(0, 4)}
              </small>
              <small>|</small>
              {movie.genres?.map((e) => (
                <small className="ms-2 fw-bold">{e.name}</small>
              ))}
            </div>
            <div className="d-none d-lg-block">
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieRow;
