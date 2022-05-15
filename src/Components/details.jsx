import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Details() {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState();
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      console.log(id);
      let response = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "?api_key=87b82e1ce0bcea0c95a22cdc1e04617e"
      );
      setMovie(response["data"]);

      let response2 = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/credits?api_key=87b82e1ce0bcea0c95a22cdc1e04617e"
      );
      setCast(response2["data"]["cast"]);

      let response3 = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/similar?api_key=87b82e1ce0bcea0c95a22cdc1e04617e&language=en-US&page=1"
      );
      setSimilar(response3["data"]["results"]);
      console.log(response);

      // IMDB
      response = await axios.get(
        "https://imdb8.p.rapidapi.com/title/get-ratings",
        {
          params: {
            tconst: response["data"].imdb_id,
          },
          headers: {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key":
              "61755a145emsh57865b4e7c1657ep1c6011jsnda462f4e35af",
          },
        }
      );
      setRating(response["data"].rating);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="row m-0">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div
            className="card mt-5 mx-4"
            style={{
              width: "auto",
              backgroundColor: "#1B1F23",
            }}
          >
            <img
              className="card-img-top"
              src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              alt="Card image cap"
            ></img>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 px-4">
          <h1 className="mt-5 fw-bold">{movie.title}</h1>
          <div className="d-flex align-items-center mt-2">
            <img
              src="https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png"
              alt=""
              width={"8%"}
            />
            <i class="bi bi-star-fill mx-2 icon-yellow"></i>
            <p className="d-inline m-0 fs-4 b">{rating}</p>
          </div>
          <div className="mt-2">
            <small className="me-2 fw-bold">
              {movie.release_date?.substring(0, 4)}
            </small>
            <small>|</small>
            {/* <small className="ms-2">{movie.title}</small> */}
            {movie.genres?.map((e) => (
              <small className="ms-2 fw-bold">{e.name}</small>
            ))}
          </div>

          {/* Zain */}

          <p className="plot mt-4 fs-5">{movie.overview}</p>
          <h2 className="mb-3 fw-bold">Cast</h2>
          {cast.slice(0, 3).map((actor) => (
            <h5 className="me-4">{actor.name}</h5>
          ))}
        </div>
        {/* Grid for recommendations */}
        <div className="col-lg-3 col-md-12 col-sm-12">
          <h4 className="mt-5 mb-4 text-center">Similar Movies</h4>
          {/* First row */}
          <div className="row justify-content-center">
            {/* Grid for one card */}
            {similar.slice(0, 2).map((e) => (
              <div className="col-lg-5 col-md-4 col-sm-4">
                <a href={"/details/" + e.id}>
                  <div className="card dark-card mb-3 changeOpacity">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original" + e.poster_path
                      }
                      alt=""
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="row justify-content-center">
            {/* Grid for one card */}
            {similar.slice(2, 4).map((e) => (
              <div className="col-lg-5 col-md-4 col-sm-4">
                <a href={"/details/" + e.id}>
                  <div className="card dark-card mb-3 changeOpacity">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original" + e.poster_path
                      }
                      alt=""
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Reviews */}
      <div className="container">
        <hr className=" my-4"></hr>
        <h4 className="text-center mt-4 mb-4">
          <i class="bi bi-star-fill mx-2 icon-yellow"></i>Movie Reviews
        </h4>
        <div class="card dark-card">
          <div class="card-body">
            <h5 class="card-title">Zain Sajid</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              <i class="bi bi-star-fill me-2 icon-yellow"></i>5/10
            </h6>
            <p class="card-text">
              The bad; sentimental storyline with no real intense drama to speak
              of, because everything in this movie is so safe and predictable.
              You know from the beginning this is the dude who is gonna be
              successfull in sports and on the way to his great success his wife
              is crying alot from time to time, about whatever. And if she aint
              crying she is looking like she is selling hallmark christmas
              cards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
