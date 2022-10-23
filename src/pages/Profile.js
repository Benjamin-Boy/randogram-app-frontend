import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import axios from "axios";

// Imports custom contexts
import { useUserContext } from "../context/UserContext";
import { useMediaContext } from "../context/MediaContext";

// Imports media
import logoLight from "../assets/images/utils/mountain-logo-light.png";
import logoDark from "../assets/images/utils/mountain-logo-dark.png";

// Imports default image
import defaultImage from "../assets/images/utils/default-profile.png";

// Imports scss styles
import "../scss/style.scss";

const Profile = ({ theme }) => {
  const navigate = useNavigate();
  const { users, deleteUser, updateUser } = useUserContext();
  const { medias, createMedia } = useMediaContext();
  const [error, setError] = useState();

  const [currentUser, setCurrentUser] = useState();
  const [profile, setProfile] = useState({});
  const [newPassword, setNewPassword] = useState("");

  const getCurrentUser = () => {
    const user = users.find(
      (user) => user.id === parseInt(localStorage.getItem("id"))
    );

    setCurrentUser(user);
  };

  const photoUpload = async (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    let mediaId = "";

    // Creates an array containing uploads name
    const uploads = await axios.get("http://localhost:1337/api/upload/files");
    const uploadsName = Array.from(
      new Set(uploads.data.map((upload) => upload.name))
    );

    // Creates an array containing media images name
    // Use existing media as relational data for user
    const mediasName = Array.from(
      new Set(
        medias.map((media) => {
          if (media.attributes.url.data[0]) {
            return media.attributes.url.data[0].attributes.name;
          }

          return null;
        })
      )
    );

    // If a media already exists with this file name
    if (mediasName.includes(file.name)) {
      const media = medias.find(
        (media) => media.attributes.url.data[0].attributes.name === file.name
      );

      mediaId = media.id;

      console.log("Profile image uploaded with existing media!");

      // If no media exist with this file name but an upload already exists with thie file name
      // Creates a new media with the existing upload
    } else if (
      !mediasName.includes(file.name) &&
      uploadsName.includes(file.name)
    ) {
      const upload = uploads.data.filter(
        (upload) => upload.name.toLowerCase() === file.name.toLowerCase()
      );

      createMedia({
        data: { url: upload[0].id },
      });

      mediaId = upload[0].id;

      console.log(
        "Profile image uploaded with existing upload creatig a new media!"
      );

      // If no media and no upload exist with this file name
      // Creates a new upload and a new media
    } else {
      const formData = new FormData();

      formData.append("files", file, file.name);

      await fetch("http://localhost:1337/api/upload", {
        method: "post",
        body: formData,
      });

      const uploads = await axios.get("http://localhost:1337/api/upload/files");

      const upload = uploads.data.filter(
        (upload) => upload.name.toLowerCase() === file.name.toLowerCase()
      );

      const newMedia = await createMedia({
        data: {
          url: upload[0].id,
        },
      });

      mediaId = newMedia.data.data.id;

      console.log("Profile image uploaded with new upload and new media!");
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile((prevState) => {
        return {
          ...prevState,
          avatarId: parseInt(mediaId),
          avatarName: file.name,
          avatarUrl: reader.result,
        };
      });
    };

    reader.readAsDataURL(file);
  };

  // const handleDeleteUser = () => {
  //   deleteUser(currentUser.id);

  //   localStorage.removeItem("jwt");
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("id");

  //   navigate("/");
  // };

  const handleUpdateUser = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setProfile((prevState) => {
      return {
        ...prevState,
        email: e.target.value,
      };
    });
  };

  function isValidEmail(email) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  const submitUpdateUser = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      avatar: e.target.avatar.id,
    };

    updateUser(currentUser.id, data);

    if (data.email !== currentUser.email) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
      localStorage.removeItem("id");

      navigate("/");
    } else {
      navigate("/");
    }
  };

  // console.log("medias", medias);
  // console.log("users", users);
  // console.log("currentUser", currentUser);
  // console.log("profile", profile);

  useEffect(() => {
    if (users.length > 0) {
      getCurrentUser();
    }
  });

  useEffect(() => {
    if (currentUser) {
      let media;

      if (currentUser.avatar) {
        media = medias.find((media) => media.id === currentUser.avatar.id);
      }

      setProfile({
        email: currentUser.email,
        avatarId: `${currentUser.avatar ? currentUser.avatar.id : null}`,
        avatarName: `${
          currentUser.avatar
            ? media.attributes.url.data[0].attributes.name
            : "profile image"
        }`,
        avatarUrl: `${
          currentUser.avatar
            ? `http://localhost:1337${media.attributes.url.data[0].attributes.url}`
            : defaultImage
        }`,
      });
    }
  }, [currentUser, medias]);

  // useEffect(() => {
  //   const readAllMedias = async () => {
  //     const response = await axios.get(
  //       "http://localhost:1337/api/medias?populate=*"
  //     );
  //     const responseArr = Object.values(response.data.data);

  //     setMedias(responseArr);
  //   };

  //   readAllMedias();
  // }, [isUpdated]);

  return (
    <div
      className={
        theme
          ? "profile-container theme--light"
          : "profile-container theme--dark"
      }
    >
      <div className="profile-container-wrapper">
        <Link to="/">
          <img
            src={theme ? logoLight : logoDark}
            alt="logo"
            className="profile-container-wrapper-logo"
          />
        </Link>
        <h2>
          {currentUser && currentUser.username ? currentUser.username : ""}
        </h2>
        <form
          className="profile-container-wrapper-form"
          onSubmit={submitUpdateUser}
        >
          <label className="image-upload-container-img">
            <input
              id={profile ? profile.avatarId : ""}
              type="file"
              name="avatar"
              accept="image/*"
              className="inputfile"
              onChange={photoUpload}
            />
            <img
              src={profile ? profile.avatarUrl : defaultImage}
              alt={profile ? profile.avatarName : "avatar"}
            />
          </label>
          <div className="email-error">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={profile && profile.email ? profile.email : ""}
              onChange={handleUpdateUser}
            />
            {error && <h5>{error}</h5>}
          </div>
          {/* <button onClick={handleResetPassword}>Reset password</button>
          <button onClick={handleDeleteUser}>Delete account</button> */}
          <button>Apply</button>
        </form>
      </div>
    </div>
  );
};

Profile.propTypes = {
  theme: PropTypes.bool.isRequired,
};

export default Profile;
