// Imports React Properties/packages
import React from "react";
import PropTypes from "prop-types";
import { AiFillHeart } from "react-icons/ai";
import { FaMountain } from "react-icons/fa";
import { BsStopwatchFill } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";

// Impots Scss Styles
import "./Featuring.scss";
import "../../scss/style.scss";

const Featuring = () => {
  return (
    <div className="featuring-container">
      <section className="featuring-container-img">
        <img src="https://picsum.photos/1500" alt="rando" />
      </section>
      <section className="featuring-container-header">
        <div className="featuring-container-header-bookmark">
          <AiFillHeart className="icon bookmark" />
        </div>
      </section>
      <div className="featuring-container-background">
        <section className="featuring-container-footer">
          <div className="featuring-container-footer-destination">
            <h3>Lac de Gaube -</h3>
            <h4>Hautes Pyrénées</h4>
          </div>
          <div className="featuring-container-footer-difficulty">
            <FaMountain className="icon difficulty" />
          </div>
        </section>
      </div>
    </div>
  );
};

Featuring.propTypes = {};

export default Featuring;
