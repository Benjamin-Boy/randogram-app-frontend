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
import "./Sidebar.scss";
import "../../scss/style.scss";

const Sidebar = ({ addActive, activeAvatar, theme, toggleTheme }) => {
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

  useEffect(() => {
    const readAllUsers = async () => {
      const response = await axios.get(
        "http://localhost:1337/api/users?populate=bookmarks, treksDone, avatar, avatar.url"
      );

      setUsers(response.data);
    };

    readAllUsers();
  }, []);

  useEffect(() => {
    const readAllMedias = async () => {
      const response = await axios.get(
        "http://localhost:1337/api/medias?populate=*&pagination[limit]=100"
      );
      const responseArr = Object.values(response.data.data);

      setMedias(responseArr);
    };

    readAllMedias();
  }, []);

  return (
    <div
      className={`${
        theme
          ? "sidebar-container theme--light"
          : "sidebar-container theme--dark"
      }`}
    >
      <section className="sidebar-container-left">
        <Link to="/">
          <img src={theme ? logoLight : logoDark} alt="logo" />
        </Link>
        {localStorage.getItem("username") && (
          <Link to="/create">
            <div className="sidebar-container-left-add">
              <FaPlusCircle className="icon create" />
            </div>
          </Link>
        )}
      </section>
      <section className="sidebar-container-center">
        <div className="sidebar-container-center-search">
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
      <section className="sidebar-container-right">
        <div className="sidebar-container-right-theme" onClick={toggleTheme}>
          {!theme ? (
            <WiMoonAltWaxingCrescent1 className="icon" />
          ) : (
            <FaSun className="icon light" />
          )}
        </div>
        {localStorage.getItem("username") ? (
          <div className="sidebar-container-right-user">
            <div className="sidebar-container-right-user-username">
              <h5>
                Hi <span>{localStorage.getItem("username")}</span>
              </h5>
            </div>
            <div
              className={
                activeAvatar
                  ? "sidebar-container-right-user-avatar active"
                  : "sidebar-container-right-user-avatar"
              }
            >
              <img
                src={
                  currentUser && currentUser.avatar
                    ? `http://localhost:1337${currentUser.avatar.url[0].url}`
                    : defaultImage
                }
                alt="avatar"
                onClick={addActive}
              />
            </div>
          </div>
        ) : (
          <div className="sidebar-container-right-login">
            <div className="sidebar-container-right-login-signin">
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
            ? "sidebar-container-navbar active"
            : "sidebar-container-navbar"
        }
      >
        {localStorage.getItem("jwt") && <Navbar theme={theme} />}
      </section>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
