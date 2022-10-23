import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Imports React components
import Navbar from "../Navbar/Navbar";

// Imports custom contexts
import { useUserContext } from "../../context/UserContext";
import { useFilterContext } from "../../context/FilterContext";
import { useMediaContext } from "../../context/MediaContext";

// Imports react icons
import { FaSearch, FaPlusCircle, FaSun } from "react-icons/fa";
import { WiMoonAltWaxingCrescent1 } from "react-icons/wi";

// Imports default image
import defaultImage from "../../assets/images/utils/default-profile.png";
import logoLight from "../../assets/images/utils/mountain-logo-light.png";
import logoDark from "../../assets/images/utils/mountain-logo-dark.png";

import axios from "axios";

// Imports Scss Styles
import "./Header.scss";
import "../../scss/style.scss";

const Header = ({ addActive, activeAvatar, theme, toggleTheme }) => {
  const { search, updateFilters } = useFilterContext();
  const { users, setUsers } = useUserContext();
  const { setMedias } = useMediaContext();
  const [currentUser, setCurrentUser] = useState("");

  const getCurrentUser = () => {
    const user = users.find(
      (user) => user.id === parseInt(localStorage.getItem("id"))
    );

    setCurrentUser(user);
  };

  useEffect(() => {
    if (users.length > 0) {
      getCurrentUser();
    }
  });

  // useEffect(() => {
  //   const readAllUsers = async () => {
  //     const response = await axios.get(
  //       "http://localhost:1337/api/users?populate=bookmarks, treksDone, avatar, avatar.url"
  //     );

  //     setUsers(response.data);
  //   };

  //   readAllUsers();
  // }, []);

  // useEffect(() => {
  //   const readAllMedias = async () => {
  //     const response = await axios.get(
  //       "http://localhost:1337/api/medias?populate=*&pagination[limit]=100"
  //     );
  //     const responseArr = Object.values(response.data.data);

  //     setMedias(responseArr);
  //   };

  //   readAllMedias();
  // }, []);

  return (
    <div
      className={`${
        theme ? "header-container theme--light" : "header-container theme--dark"
      }`}
    >
      <section className="header-container-left">
        <Link to="/">
          <img src={theme ? logoLight : logoDark} alt="logo" />
        </Link>
        {localStorage.getItem("username") && (
          <Link to="/create">
            <div className="header-container-left-add">
              <FaPlusCircle className="icon create" />
            </div>
          </Link>
        )}
      </section>
      <section className="header-container-center">
        <div className="header-container-center-search">
          <FaSearch className="search" />
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={search}
            onChange={updateFilters}
          />
        </div>
      </section>
      <section className="header-container-right">
        <div className="header-container-right-theme" onClick={toggleTheme}>
          {!theme ? (
            <WiMoonAltWaxingCrescent1 className="icon" />
          ) : (
            <FaSun className="icon light" />
          )}
        </div>
        {localStorage.getItem("username") ? (
          <div className="header-container-right-user">
            <div className="header-container-right-user-username">
              <h5>
                Hi <span>{localStorage.getItem("username")}</span>
              </h5>
            </div>
            <div
              className={
                activeAvatar
                  ? "header-container-right-user-avatar active"
                  : "header-container-right-user-avatar"
              }
            >
              <img
                src={
                  currentUser && currentUser.avatar
                    ? `${currentUser.avatar}`
                    : defaultImage
                }
                alt="avatar"
                onClick={addActive}
              />
            </div>
          </div>
        ) : (
          <div className="header-container-right-login">
            <div className="header-container-right-login-signin">
              <h5>
                <Link to="/login">Sign in</Link>
              </h5>
            </div>
          </div>
        )}
      </section>
      <section
        className={
          activeAvatar
            ? "header-container-navbar active"
            : "header-container-navbar"
        }
      >
        {localStorage.getItem("username") && <Navbar theme={theme} />}
      </section>
    </div>
  );
};

Header.propTypes = {
  addActive: PropTypes.func.isRequired,
  activeAvatar: PropTypes.bool.isRequired,
};

export default Header;
