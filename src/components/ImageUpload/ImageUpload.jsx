import PropTypes from "prop-types";

// Imports default image
import defaultImage from "../../assets/images/utils/default-profile.png";

//Import scss styles
import "./ImageUpload.scss";

const ImageUpload = ({ currentUser, avatar, photoUpload }) => {
  return (
    <div className="image-upload-container">
      <label className="image-upload-container-img">
        <input type="file" className="inputfile" onChange={photoUpload} />
        <img
          src={currentUser && currentUser.avatar ? avatar.url : defaultImage}
          alt={currentUser && currentUser.avatar ? avatar.name : "avatar"}
        />
      </label>
    </div>
  );
};

ImageUpload.propTypes = {};

export default ImageUpload;
