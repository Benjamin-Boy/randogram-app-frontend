import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

// Imports custom contexts
import { useTrekContext } from "../context/TrekContext";
import { useMediaContext } from "../context/MediaContext";

import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

// Imports scss styles
import "../scss/style.scss";

import defaultImage from "../assets/images/utils/default-profile.png";

const Create = ({ theme, currentUser }) => {
  const { createTrek, setTreks } = useTrekContext();
  const { medias } = useMediaContext();

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [upElev, setUpElev] = useState("");
  const [downElev, setDownElev] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [trekMedias, setTrekMedias] = useState([]);
  const [files, setFiles] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  let trekData = {
    data: {
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
      medias: trekMedias,
      creator: currentUser.id,
    },
  };

  const handleCreateTrek = () => {
    let filesId = [];

    // if (files.length > 0) {
    //   files.forEach((file) => {
    //     filesId.push(file.id);
    //   });

    //   const filteredMedias = medias.filter((media) =>
    //     filesId.includes(media.attributes.url.data[0].id)
    //   );

    //   const filteredMediasId = [];
    //   filteredMedias.forEach((media) => filteredMediasId.push(media.id));

    //   if (filteredMedias.length > 0) {
    //     filteredMediasId.forEach((id) => trekData.data.medias.push(id));

    //     console.log("Modified TREKDATA", trekData);
    //   }
    // }

    createTrek(trekData);
    setIsCreated(true);

    console.log("New Trek created !");

    setName("");
    setRegion("");
    setStartLocation("");
    setEndLocation("");
    setUpElev("");
    setDownElev("");
    setDifficulty("");
    setDuration("");
    setDistance("");
    setDescription("");
    setTrekMedias([]);
    setFiles([]);
  };

  const addNewMedia = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.files[0];
    const uploadsName = [];
    const uploads = await axios.get("http://localhost:1337/api/upload/files");

    uploads.data.forEach((data) => {
      uploadsName.push(data.name);
    });

    if (!uploadsName.includes(file.name)) {
      formData.append("files", file, file.name);

      const postImageResponse = await axios.post(
        "http://localhost:1337/api/medias",
        {
          data: {
            formData,
          },
        }
      );

      const newImageId = postImageResponse.data.data.id;

      formData.append("refId", newImageId);
      formData.append("ref", "api::media.media");
      formData.append("field", "url");

      await fetch("http://localhost:1337/api/upload", {
        method: "post",
        body: formData,
      });

      const updateUploads = await axios.get(
        "http://localhost:1337/api/upload/files"
      );

      const upload = updateUploads.data.filter(
        (upload) => upload.name === file.name
      );

      setFiles((prevState) => [
        ...prevState,
        { id: upload[0].id, url: upload[0].url },
      ]);
      setTrekMedias((prevState) => [...prevState, newImageId]);

      console.log("Uploaded with NEW file !");
    } else {
      const upload = uploads.data.filter((upload) => upload.name === file.name);

      setFiles((prevState) => [
        ...prevState,
        { id: upload[0].id, url: upload[0].url },
      ]);

      console.log("File already exists !");
    }
  };

  const updateNewMedia = (e) => {
    // TODO Change image of uploaded file before creating new trek
    console.log(e.target);
  };

  const deleteUploadedFile = (e) => {
    // TODO Delete uploaded file before creating new trek
    console.log(e.target);
  };

  useEffect(() => {
    const readAllTreks = async () => {
      const response = await axios.get(
        "http://localhost:1337/api/treks?pagination[pageSize]=100&populate=creator, medias, medias.url"
      );
      const responseArr = Object.values(response.data.data);
      setTreks(responseArr);
    };

    readAllTreks();
    setIsCreated(false);
  }, [setTreks, isCreated]);

  return (
    <div
      className={
        theme
          ? "creation-container theme--light"
          : "creation-container theme--dark"
      }
    >
      <div className="creation-container-wrapper">
        <div className="creation-container-wrapper-form-container">
          <div className="creation-container-wrapper-form-container-infos">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <input
              type="text"
              placeholder="Start location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="End location"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
            <input
              type="number"
              placeholder="Up elevation"
              value={upElev}
              onChange={(e) => setUpElev(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Down elevation"
              value={downElev}
              onChange={(e) => setDownElev(parseInt(e.target.value))}
            />
            <input // TODO Create a dropdown menu
              type="text"
              placeholder="Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            <input
              type="number"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Distance"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value))}
            />
            <textarea
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="creation-container-wrapper-form-container-medias">
            <div className="creation-container-wrapper-form-container-medias-upload">
              {files.map((file, index) => {
                return (
                  <label
                    key={file ? `http://localhost:1337${file.id}` : index}
                    className="upload-img"
                  >
                    <FaTrashAlt
                      className="icon trash"
                      onClick={deleteUploadedFile}
                    />
                    <input
                      type="file"
                      placeholder="Medias"
                      className="upload-media"
                      onChange={updateNewMedia}
                    />
                    <img
                      src={
                        file
                          ? `http://localhost:1337${file.url}`
                          : { defaultImage }
                      }
                      alt={
                        file
                          ? `http://localhost:1337${file.url}`
                          : "default-image"
                      }
                    />
                  </label>
                );
              })}

              <label className="upload-input">
                <FaPlusCircle className="icon create" />
                <input
                  type="file"
                  placeholder="Medias"
                  className="upload-media"
                  onChange={addNewMedia}
                />
              </label>
            </div>
          </div>
        </div>
        <button onClick={handleCreateTrek}>Create New Trek</button>
      </div>
    </div>
  );
};

Create.propTypes = {
  theme: PropTypes.bool.isRequired,
};

export default Create;
