import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Logout = ({}) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("id");

    navigate("/login");
  });

  return <></>;
};

Logout.propTypes = {};

export default Logout;
