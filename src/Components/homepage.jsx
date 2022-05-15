import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Homepage() {
  const [listOfMovie, setListOfMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=87b82e1ce0bcea0c95a22cdc1e04617e"
      );
      let tempList = response["data"]["results"];
      setListOfMovie(tempList);

      let response2 = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=87b82e1ce0bcea0c95a22cdc1e04617e&query=spider&page=1"
      );
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex flex-grow-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h3 className="text-center mt-4 mb-0">
                <i class="bi bi-star-fill mx-2 icon-yellow"></i>Popular Movies
              </h3>
            </div>
            <hr className="my-4"></hr>
          </div>
          <div className="row">
            {listOfMovie.slice(0, 8).map((e) => (
              <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <a
                  href={"/details/" + e.id}
                  className="textCard text-decoration-none"
                >
                  <div
                    className="card dark-card changeOpacity"
                    style={{
                      width: "auto",
                      backgroundColor: "#1B1F23",
                      height: "100%",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={
                        "https://image.tmdb.org/t/p/original/" + e.poster_path
                      }
                      alt={e.title}
                    ></img>
                    <div className="card-body">
                      <h5 className="card-title">{e.title}</h5>
                      <p className="card-text">
                        {e.release_date.substring(0, 4)}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
