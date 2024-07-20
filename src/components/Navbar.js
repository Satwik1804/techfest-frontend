import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/techfest">
            TechFest
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/events" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/events"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/competitions" ? "active" : ""
                  }`}
                  to="/competitions"
                >
                  Competitions
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/workshops" ? "active" : ""
                  }`}
                  to="/workshops"
                >
                  Workshops
                </Link>
              </li>
            </ul>
            <form class="d-flex">
              <Link
                id="login"
                class="btn btn-primary mx-2"
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                id="logout"
                class="btn btn-primary mx-2"
                to="/logout"
                role="button"
              >
                Logout
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;