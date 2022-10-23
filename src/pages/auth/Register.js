import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// Imports custom contexts
import { useUserContext } from "../../context/UserContext";

// Imports media
import logoLight from "../../assets/images/utils/mountain-logo-light.png";
import logoDark from "../../assets/images/utils/mountain-logo-dark.png";

// Imports scss styles
import "../../scss/style.scss";

const Register = ({ theme }) => {
  const navigate = useNavigate();
  const { createUser, users } = useUserContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const data = {
    username,
    email,
    password,
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const user = users.find((user) => user.email === email);

    if (!user) {
      createUser(data);
      setIsCreated(true);

      console.log("New user created !");
    } else {
      console.log("User already exists");
    }
  };

  useEffect(() => {
    if (isCreated) {
      const loginNewUser = async () => {
        const { data } = await axios.post(
          "http://localhost:1337/api/auth/local",
          {
            identifier: email,
            password: password,
          }
        );

        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("id", data.user.id);

        navigate("/");
        setIsCreated(false);
      };

      loginNewUser();
    }
  }, [isCreated, email, password, navigate]);

  return (
    <div
      className={
        theme
          ? "register-container theme--light"
          : "register-container theme--dark"
      }
    >
      <div
        className={
          theme
            ? "register-container-wrapper theme--light"
            : "register-container-wrapper theme--dark"
        }
      >
        <Link to="/">
          <img src={theme ? logoLight : logoDark} alt="logo" />
        </Link>
        <h2>Welcome to Randogram</h2>
        <form className="register-container-wrapper-form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="password" placeholder="Confirm password" />
          <button onClick={handleCreateUser}>Sign up</button>
        </form>
        <h6>
          Already on Randogram ?
          <Link to="/login">
            <span> Log in</span>
          </Link>
        </h6>
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
