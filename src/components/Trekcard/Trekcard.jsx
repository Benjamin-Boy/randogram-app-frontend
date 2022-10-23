// Imports React Properties/packages
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Imports custon contexts
import { useUserContext } from "../../context/UserContext";

// Imports React Icons
import { AiFillHeart } from "react-icons/ai";
import { FaMountain, FaCheck } from "react-icons/fa";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";
import { BsFillPatchCheckFill } from "react-icons/bs";

// Imports Scss Styles
import "./Trekcard.scss";
import "../../scss/style.scss";

// Imports servives
import { trekDuration } from "../../services/durationConvert";

const Trekcard = ({
  id,
  name,
  region,
  upElev,
  downElev,
  difficulty,
  duration,
  distance,
  description,
  medias,
}) => {
  const { updateUser, users } = useUserContext();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();

  const setBookmark = async () => {
    const user = users.find(
      (user) => user.id === parseInt(localStorage.getItem("id"))
    );

    if (user) {
      let data;

      if (!isBookmarked) {
        user.bookmarks.push(id);

        data = {
          bookmarks: user.bookmarks,
        };

        setIsBookmarked(true);
      } else {
        user.bookmarks = user.bookmarks.filter(
          (bookmark) => bookmark.id !== id
        );

        data = {
          bookmarks: user.bookmarks,
        };

        setIsBookmarked(false);
      }

      updateUser(localStorage.getItem("id"), data);
    } else {
      navigate("/login");
    }
  };

  const setTrekDone = () => {
    const user = users.find(
      (user) => user.id === parseInt(localStorage.getItem("id"))
    );

    if (user) {
      let data;

      if (!isDone) {
        user.treksDone.push(id);

        data = {
          treksDone: user.treksDone,
        };

        setIsDone(true);
      } else {
        user.treksDone = user.treksDone.filter((trek) => trek.id !== id);

        data = {
          treksDone: user.treksDone,
        };

        setIsDone(false);
      }

      updateUser(localStorage.getItem("id"), data);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      const user = users.find(
        (user) => user.id === parseInt(localStorage.getItem("id"))
      );

      if (user) {
        const bookmarksId = new Set(
          user.bookmarks.map((bookmark) => bookmark.id)
        );

        if (Array.from(bookmarksId).includes(id)) {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }

        const treksId = new Set(user.treksDone.map((trek) => trek.id));

        if (Array.from(treksId).includes(id)) {
          setIsDone(true);
        } else {
          setIsDone(false);
        }
      }
    }
  }, [isBookmarked, isDone, id, users]);

  return (
    <div
      className={isDone ? "trekcard-container trek-done" : "trekcard-container"}
    >
      <section className="trekcard-container-img">
        <img
          src={
            medias.length > 0 ? `${medias[0].url}` : "https://picsum.photos/500"
          }
          alt="rando-thumbnail"
        />
      </section>
      <section className="trekcard-container-header">
        <button
          className="trekcard-container-header-bookmark"
          onClick={setBookmark}
        >
          <AiFillHeart
            className={`icon ${isBookmarked ? "is-bookmarked" : "bookmark"}`}
          />
        </button>
        <button
          className="trekcard-container-header-trek-done"
          onClick={setTrekDone}
        >
          <FaCheck className={`icon ${isDone ? "is-done" : "trek-done"}`} />
        </button>
      </section>
      <Link to={`/treks/${id}`}>
        <div className="trekcard-container-background">
          <section className="trekcard-container-footer">
            {isDone && (
              <>
                <div className="trekcard-container-footer-trekdone-background"></div>
                <div className="trekcard-container-footer-trekdone-banner"></div>
                <div className="trekcard-container-footer-trekdone-content">
                  <BsFillPatchCheckFill className="icon is-done" />
                  <h5>Trek already done</h5>
                </div>
              </>
            )}
            <div className="trekcard-container-footer-top">
              <div className="trekcard-container-footer-top-destination">
                <h4>{name} -</h4>
                <h5>{region}</h5>
              </div>
              <div className="featuring-container-footer-top-difficulty">
                <FaMountain
                  className={`icon difficulty--${difficulty.toLowerCase()}`}
                />
              </div>
            </div>
            <div className="trekcard-container-footer-stats">
              <div className="trekcard-container-footer-stats-top">
                <h6>
                  <FiArrowUpRight className="icon arrow-up" /> {upElev}m+
                </h6>
                <h6>
                  <FiArrowDownRight className="icon arrow-down" /> {downElev}m-
                </h6>
                <h6>
                  Level :{" "}
                  <span className={`${difficulty.toLowerCase()}`}>
                    {difficulty}
                  </span>
                </h6>
              </div>
              <div className="trekcard-container-footer-stats-bottom">
                <h6>
                  {distance}km - {trekDuration(duration)}
                </h6>
              </div>
              <div className="trekcard-container-footer-stats-description">
                <p className="trekcard-typo">
                  {description.substring(0, 70)}
                  {"..."}
                </p>
              </div>
              <div className="trekcard-container-footer-stats-goto">
                <GoTriangleDown />
              </div>
            </div>
          </section>
        </div>
      </Link>
    </div>
  );
};

Trekcard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  upElev: PropTypes.number.isRequired,
  downElev: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
};

export default Trekcard;
