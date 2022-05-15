import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieRow from "./movierow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const { value } = useParams();
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=87b82e1ce0bcea0c95a22cdc1e04617e&query=" +
          value
      );
      let tempList = response["data"]["results"];
      console.log(tempList);
      setSearchList(tempList);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 mt-4">
            <div className="d-flex">
              <i className="m-2 fa-lg">
                <FontAwesomeIcon icon={faSearch} />
              </i>
            <h3 className="mb-0 fw-bold d-inline">Search Results</h3>
            </div>
          </div>
          <hr className="my-4"></hr>
          <div className="row">
            {searchList.slice(0, 8).map((e) => (
              <MovieRow movie={e} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
