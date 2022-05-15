import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

function Navbar() {
  // For SignUp
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameErrorClass, setNameErrorClass] = useState("none");
  const [emailErrorClass, setEmailErrorClass] = useState("none");
  const [passwordErrorClass, setPasswordErrorClass] = useState("none");
  const [confirmPasswordErrorClass, setConfirmPasswordErrorClass] =
    useState("none");

  //For Search
  const [searchText, setSearchText] = useState("");
  const [navigateToSearch, setNavigateToSearch] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (searchText) {
      setNavigateToSearch(true);
    }
  }

  if (navigateToSearch) {
    console.log(searchText);
    // return <Navigate to={"/search/" + searchText}/>;
    window.location.href = "http://localhost:3000/search/";
  }

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function clearField() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNameErrorClass("none");
    setEmailErrorClass("none");
    setPasswordErrorClass("none");
    setConfirmPasswordErrorClass("none");
  }

  function handleSignUpSubmission(e) {
    e.preventDefault();

    if (name.length < 3) {
      setNameErrorClass("block");
      return;
    }

    if (!validateEmail()) {
      setEmailErrorClass("block");
      return;
    }

    if (password.length < 6) {
      setPasswordErrorClass("block");
      return;
    }

    if (password != confirmPassword) {
      setConfirmPasswordErrorClass("block");
      return;
    }
  }

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#1B1F23" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://i.postimg.cc/52k5HbGb/logo.png"
              alt=""
              height={"40vh"}
              className="d-inline-block align-text-top"
            ></img>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <form
              className="d-flex me-2"
              action="http://localhost:3000/search/"
            >
              <input
                className="form-control me-2"
                type="search"
                value={searchText}
                placeholder="Search"
                aria-label="Search"
                name="query"
                required="true"
                onInput={(e) => setSearchText(e.target.value)}
              ></input>
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>

            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Movies
                </a>
              </li>
              <li className="nav-item me-2">
                <a href="/watchlist" className="nav-link">
                  Watchlist
                </a>
              </li>
              <li>
                <a
                  className="nav-link login"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#signUpModal"
                  onClick={clearField}
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  className="nav-link login"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <div
        class="modal"
        id="loginModal"
        tabindex="-1"
        aria-labelledby="loginModalExample"
        aria-hidden="true"
      >
        <div class="modal-dialog text-body">
          <div class="modal-content">
            <div class="modal-header text-center p-0">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#signUpModal"
                className="col-6 p-3 text-decoration-none text-body border-bottom border-4"
                style={{ backgroundColor: "#eaeaea" }}
              >
                <h5 className="mb-0">Register</h5>
              </a>
              <a
                className="col-6 p-3 text-decoration-none text-body border-bottom border-4 border-warning"
                href="#"
              >
                <h5 className="mb-0">Login</h5>
              </a>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                ></input>
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                ></input>
                <label for="floatingPassword">Password</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-lg btn-primary py-2 px-3">
                <p className="d-inline fw-bold small">Login</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <div
        class="modal"
        id="signUpModal"
        tabindex="-1"
        aria-labelledby="signUpModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog text-body">
          <div class="modal-content">
            <div class="modal-header text-center p-0">
              <a
                href="#"
                className="col-6 p-3 text-decoration-none text-body border-bottom border-4 border-warning"
              >
                <h5 className="mb-0">Register</h5>
              </a>
              <a
                className="col-6 p-3 text-decoration-none text-body border-bottom border-4"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                style={{ backgroundColor: "#eaeaea" }}
              >
                <h5 className="mb-0">Login</h5>
              </a>
            </div>
            <form onSubmit={handleSignUpSubmission}>
              <div class="modal-body">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    value={name}
                    class="form-control"
                    id="nameInput"
                    placeholder="name@example.com"
                    onInput={(e) => setName(e.target.value)}
                    onChange={(e) => setNameErrorClass("none")}
                  ></input>
                  <label for="nameInput">Name</label>
                  <span class={"text-danger d-" + nameErrorClass}>
                    Name cant be less than three character
                  </span>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    value={email}
                    class="form-control"
                    id="emailInput"
                    placeholder="name@example.com"
                    onInput={(e) => setEmail(e.target.value)}
                    onChange={(e) => setEmailErrorClass("none")}
                  ></input>
                  <label for="emailInput">Email address</label>
                  <span class={"text-danger d-" + emailErrorClass}>
                    Enter a valid Email
                  </span>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    value={password}
                    class="form-control"
                    id="passwordInput"
                    placeholder="Password"
                    onInput={(e) => setPassword(e.target.value)}
                    onChange={(e) => setPasswordErrorClass("none")}
                  ></input>
                  <label for="passwordInput">Password</label>
                  <span class={"text-danger d-" + passwordErrorClass}>
                    Password must be of atleast 6 character
                  </span>
                </div>
                <div class="form-floating">
                  <input
                    type="password"
                    value={confirmPassword}
                    class="form-control"
                    id="confirmPasswordInput"
                    placeholder="Password"
                    onInput={(e) => setConfirmPassword(e.target.value)}
                    onChange={(e) => setConfirmPasswordErrorClass("none")}
                  ></input>
                  <label for="confirmPasswordInput">Confirm Password</label>
                  <span class={"text-danger d-" + confirmPasswordErrorClass}>
                    Passwords dont match!!
                  </span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-lg btn-primary">
                  <p className="d-inline fw-bold small">Register</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
