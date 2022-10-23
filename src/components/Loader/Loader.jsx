import React from "react";
import PropTypes from "prop-types";

// Imports Scss Styles
import "./Loader.scss";
import "../../scss/style.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-container-spinner"></div>
    </div>
  );
};

Loader.propTypes = {};

export default Loader;
