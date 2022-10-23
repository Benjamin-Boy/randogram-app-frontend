import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Imports custom contexts
import { useMediaContext } from "../context/MediaContext";

const Error = () => {
  const { medias } = useMediaContext();
  const [imgSource, setImgSource] = useState();

  const loadBackgroundImage = () => {
    const media = medias[Math.floor(Math.random() * medias.length)];
    setImgSource(media.attributes.url.data[0].attributes.url);
  };

  useEffect(() => {
    if (medias.length > 0) {
      loadBackgroundImage();
    }
  });

  return (
    <div className="error-container">
      <img src={`http://localhost:1337${imgSource}`} alt="background-img" />
      <div className="error-container-infos">
        <h1>It seems you lost your path...</h1>
        <h3>Let's go back to the starting point !</h3>
        <Link to="/">
          <button>
            <h4>Back to Home page</h4>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
