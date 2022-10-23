import PropTypes from "prop-types";

// Imports React Components

// Imports React Icons
import { AiFillCloseCircle } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

//Import scss styles
import "./MediaModal.scss";

const MediaModal = ({ handleMediaClick, mediaSource, mediaType, theme }) => {
  return (
    <div
      className={
        theme ? "modal-background theme--light" : "modal-background theme--dark"
      }
    >
      <div
        className={
          theme ? "modal-container theme--light" : "modal-container theme--dark"
        }
      >
        <div className="modal-container-header">
          {/* <FaChevronLeft onClick={handleMediaClick} className="icon close" /> */}
          <AiFillCloseCircle
            onClick={handleMediaClick}
            className="icon close"
          />
          {/* <FaChevronRight onClick={handleMediaClick} className="icon close" /> */}
        </div>
        <div className="modal-container-body">
          {mediaType === "image" ? (
            <img src={mediaSource} alt="enlarged-img" />
          ) : (
            <video controls width="100%">
              <source src={mediaSource} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="modal-container-footer"></div>
      </div>
    </div>
  );
};

MediaModal.propTypes = {};

export default MediaModal;
