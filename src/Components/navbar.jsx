import React, { useState } from "react";

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
  const [errorText, setErrorText] = useState("");

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
      setErrorText("Name cant be less than three character");
      setNameErrorClass("block");
      return;
    }

    if (!validateEmail()) {
      setErrorText("Enter a valid Email");
      setEmailErrorClass("block");
      return;
    }

    if (password.length < 6) {
      setErrorText("Password must be of atleast 6 character");
      setPasswordErrorClass("block");
      return;
    }

    if (password != confirmPassword) {
      setErrorText("Passwords dont match!!");
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
          <a className="navbar-brand" href="#">
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
            <form className="d-flex me-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
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
                <a className="nav-link" href="#">
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
                  Signup
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
        class="modal fade"
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
                <h3>Sign up</h3>
              </a>
              <a
                className="col-6 p-3 text-decoration-none text-body border-bottom border-4 border-warning"
                href="#"
              >
                <h3>Login</h3>
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
              <button type="button" class="btn btn-lg btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <div
        class="modal fade"
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
                <h3>Sign up</h3>
              </a>
              <a
                className="col-6 p-3 text-decoration-none text-body border-bottom border-4"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                style={{ backgroundColor: "#eaeaea" }}
              >
                <h3>Login</h3>
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
                    {errorText}
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
                    {errorText}
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
                    {errorText}
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
                    {errorText}
                  </span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-lg btn-primary">
                  Sign Up
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
