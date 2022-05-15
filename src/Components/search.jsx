import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieRow from "./movierow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get("query");
  const [searchList, setSearchList] = useState([]);
  const [resultLoaded, setResultLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=87b82e1ce0bcea0c95a22cdc1e04617e&query=" +
          value
      );
      let tempList = response["data"]["results"];
      console.log(tempList);
      setSearchList(tempList);
      setResultLoaded(true);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex flex-grow-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 mt-4">
              <div className="d-flex">
                <i className="m-2 fa-lg">
                  <FontAwesomeIcon icon={faSearch} />
                </i>
                <h3 className="mb-0 fw-bold d-inline">
                  {'SEARCH RESULT FOR "' + value + '"'}
                </h3>
              </div>
            </div>
            <hr className="my-4"></hr>
            <div className="row">
              {resultLoaded == false ? (
                <div className="row justify-content-center">
                  <div class="spinner-border text-light spinner-size" role="status">
                  <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : searchList.length != 0 ? (
                searchList.slice(0, 8).map((e) => <MovieRow movie={e} />)
              ) : (
                <h1>No Movies Found</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
