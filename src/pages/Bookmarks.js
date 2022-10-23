// Imports React Properties/packages
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Imports React Components
import Trekcard from "../components/Trekcard/Trekcard";
import Navbar from "../components/Navbar/Navbar";

const Bookmarks = ({
  treks,
  getSearchedTreks,
  activeAvatar,
  filterDifficulty,
  filterDuration,
  durationFilter,
  theme,
}) => {
  const [user, setUser] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      const fetchBookmarks = async () => {
        const user = await axios.get(
          "http://localhost:1337/api/users/me?populate=*",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        setUser(user);

        const bookmarksArr = [];

        user.data.bookmarks.forEach((bookmark) =>
          bookmarksArr.push(bookmark.id)
        );

        const newBookmarks = treks.filter((trek) =>
          bookmarksArr.includes(trek.id)
        );

        setBookmarks(newBookmarks);
      };

      fetchBookmarks();
    }
  }, []);

  return (
    <div
      className={
        theme ? "home-container theme--light" : "home-container theme--dark"
      }
    >
      <section className="home-container-trekcards">
        {getSearchedTreks(bookmarks).map((trek) => (
          <Trekcard
            key={trek.id}
            id={trek.id}
            name={trek.attributes.name}
            region={trek.attributes.region}
            startLocation={trek.attributes.startLocation}
            endLocation={trek.attributes.endLocation}
            upElev={trek.attributes.upElev}
            downElev={trek.attributes.downElev}
            difficulty={trek.attributes.difficulty}
            duration={trek.attributes.duration}
            distance={trek.attributes.distance}
            description={trek.attributes.description}
          />
        ))}
      </section>
      <section
        className={
          activeAvatar
            ? "home-container-navbar active"
            : "home-container-navbar"
        }
      >
        <Navbar
          activeAvatar={activeAvatar}
          theme={theme}
          filterDifficulty={filterDifficulty}
          filterDuration={filterDuration}
          durationFilter={durationFilter}
        />
      </section>
    </div>
  );
};

Bookmarks.propTypes = {};

export default Bookmarks;
