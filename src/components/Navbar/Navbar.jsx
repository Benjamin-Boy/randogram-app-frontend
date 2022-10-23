import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Imports custom contexts
import { useFilterContext } from "../../context/FilterContext";

// Imports Scss Styles
import "./Navbar.scss";
import "../../scss/style.scss";

// Imports servives
import { filterTrekDuration } from "../../services/durationConvert";

const Navbar = ({ theme }) => {
  const {
    updateFilters,
    filters: { duration, minDuration, maxDuration },
  } = useFilterContext();

  return (
    <div className="wrapper">
      <div
        className={
          theme
            ? "navbar-container theme--light"
            : "navbar-container theme--dark"
        }
      >
        <ul>
          <li className="navbar-container-treks">
            <h4>Treks</h4>
            <div className="navbar-container-treks-choice">
              <label>
                <input type="checkbox" name="myTreks" onClick={updateFilters} />
                <h5>My treks</h5>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="treksDone"
                  onClick={updateFilters}
                />
                <h5>Treks done</h5>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bookmarks"
                  onClick={updateFilters}
                />
                <h5>Bookmarks</h5>
              </label>
            </div>
          </li>
          <li className="navbar-container-difficulty">
            <h4>Difficulty</h4>
            <div className="navbar-container-difficulty-choice">
              <label>
                <input type="checkbox" name="easy" onClick={updateFilters} />
                <h5>Easy</h5>
              </label>
              <label>
                <input type="checkbox" name="medium" onClick={updateFilters} />
                <h5>Medium</h5>
              </label>
              <label>
                <input type="checkbox" name="hard" onClick={updateFilters} />
                <h5>Hard</h5>
              </label>
            </div>
          </li>
          <li>Max duration</li>
          <li>
            <input
              type="range"
              name="duration"
              value={duration}
              min={minDuration}
              max={maxDuration}
              // step={minDuration}
              // step={Number(duration) < 43200 ? "3600" : "36000"}
              onChange={updateFilters}
            />
            <h5>{filterTrekDuration(duration)}</h5>
          </li>
        </ul>
        <div className="navbar-container-divider"></div>
        <div className="navbar-container-profile">
          <Link to="/profile">
            <h4 className="navbar-container-profile">Profile</h4>
          </Link>
        </div>
        <div className="logout">
          <Link to="/logout">
            <h3 className="navbar-container-logout">Log out</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  theme: PropTypes.bool.isRequired,
};

export default Navbar;
