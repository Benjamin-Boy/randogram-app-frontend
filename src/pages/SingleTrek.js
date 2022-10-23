import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// Imports React Components
import Modal from "../components/Modals/MediaModal";

// Imports servives
import { trekDuration } from "../services/durationConvert";

// Imports custom contexts

// Imports React Icons
import { FaMountain, FaCheck } from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { GiDuration, GiPathDistance } from "react-icons/gi";

// Imports local medias
import bannerDefaultImage from "../assets/images/utils/default-profile.png";

// Imports scss styles
import "../scss/style.scss";

const SingleTrek = ({ treks, theme }) => {
  const [singleTrek, setSingleTrek] = useState({});
  const [mediaSource, setMediaSource] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();
  const trek = treks.find((trek) => trek.id === parseInt(id));

  const {
    name,
    region,
    startLocation,
    endLocation,
    upElev,
    downElev,
    difficulty,
    duration,
    distance,
    description,
    creator,
    medias,
  } = trek.attributes;

  const handleMediaClick = (e) => {
    if (!openModal) {
      setMediaType(e.target.attributes.type.value);
      setMediaSource(e.target.src);
    }
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const trek = treks.find((trek) => trek.id === parseInt(id));

    setSingleTrek(trek);
  }, [treks, id]);

  return (
    <div
      className={
        theme
          ? "single-trek-container theme--light"
          : "single-trek-container theme--dark"
      }
    >
      <section className="single-trek-container-banner">
        <img src={bannerDefaultImage} alt="banner" />
        <div className="banner-infos">
          <div className="banner-infos-title">
            <h2>{name}</h2>
            <h3>{region}</h3>
          </div>
          <div className="banner-infos-creator">
            <h5>Created by:</h5>
            <h5>{creator.data && creator.data.attributes.username}</h5>
          </div>
        </div>
      </section>
      <section className="single-trek-container-trek">
        <div className="single-trek-container-trek-infos">
          <div className="single-trek-container-trek-infos-stats">
            <div className="single-trek-container-trek-infos-stats-left">
              <div className="info">
                <HiLocationMarker className="icon start" />
                <h4 className="info-name">Start location:</h4>
                <h4>{startLocation}</h4>
              </div>
              <div className="info">
                <HiLocationMarker className="icon end" />
                <h4 className="info-name">End location:</h4>
                <h4>{endLocation}</h4>
              </div>
              <div className="info">
                <FiTrendingUp className="icon up-elev" />
                <h4 className="info-name">Up elevation gain:</h4>
                <h4>{upElev}m</h4>
              </div>
              <div className="info">
                <FiTrendingDown className="icon down-elev" />
                <h4 className="info-name">Down elevation gain:</h4>
                <h4>{downElev}m</h4>
              </div>
            </div>
            <div className="single-trek-container-trek-infos-stats-right">
              <div className="info">
                <FaMountain
                  className={`icon difficulty--${difficulty.toLowerCase()}`}
                />
                <h4 className="info-name difficulty">Difficulty:</h4>
                <h4>{difficulty}</h4>
              </div>
              <div className="info">
                <GiDuration className="icon duration" />
                <h4 className="info-name">Duration:</h4>
                <h4>{trekDuration(duration)}</h4>
              </div>
              <div className="info">
                <GiPathDistance className="icon distance" />
                <h4 className="info-name distance">Distance:</h4>
                <h4>{distance}km</h4>
              </div>
            </div>
          </div>
          <div className="trek-description">
            <h4 className="info-name description">Description:</h4>
            <p className="single-trek-typo">{description}</p>
          </div>
        </div>
        <div className="single-trek-container-trek-medias">
          {medias.data.map((media) => {
            if (
              media.attributes.url.data[0].attributes.mime.includes("image")
            ) {
              return (
                <div
                  key={media.id}
                  className="single-trek-container-trek-medias-preview"
                >
                  <img
                    id={media.id}
                    type="image"
                    src={`http://localhost:1337${media.attributes.url.data[0].attributes.url}`}
                    alt={`http://localhost:1337${media.attributes.url.data[0].attributes.name}`}
                    onClick={handleMediaClick}
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={media.id}
                  className="single-trek-container-trek-medias-preview"
                >
                  <video
                    id={media.id}
                    type="video"
                    src={`http://localhost:1337${media.attributes.url.data[0].attributes.url}`}
                    onClick={handleMediaClick}
                  >
                    <source
                      src={`http://localhost:1337${media.attributes.url.data[0].attributes.url}`}
                      type="video/mp4"
                    />
                  </video>
                  {/* <Video
                    key={media.id}
                    id={media.id}
                    className="react-player"
                    mediaSource={`http://localhost:1337${media.attributes.url.data[0].attributes.url}`}
                    onClick={handleMediaClick}
                  /> */}
                </div>
              );
            }
          })}
        </div>
        <div className="single-trek-container-trek-medias-modal"></div>
      </section>
      {openModal && (
        <Modal
          handleMediaClick={handleMediaClick}
          mediaSource={mediaSource}
          mediaType={mediaType}
          theme={theme}
        />
      )}
    </div>
  );
};

SingleTrek.propTypes = {};

export default SingleTrek;
