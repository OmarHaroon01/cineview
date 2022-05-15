import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieRow from "./movierow";

function Watchlist() {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=87b82e1ce0bcea0c95a22cdc1e04617e"
      );
      let tempList = response["data"]["results"];
      console.log(tempList);
      setWishList(tempList);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex flex-grow-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h3 className="mt-4 mb-0 fw-bold">Your Watchlist</h3>
            </div>
            <hr className="my-4"></hr>
            <div className="row">
              {wishList.slice(5, 11).map((e) => (
                <MovieRow movie={e} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watchlist;
