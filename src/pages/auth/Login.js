import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Imports external dependencies
import axios from "axios";

// Imports custon contexts
import { useUserContext } from "../../context/UserContext";

// Imports media
import logoLight from "../../assets/images/utils/mountain-logo-light.png";
import logoDark from "../../assets/images/utils/mountain-logo-dark.png";

// Imports scss styles
import "../../scss/style.scss";

const Login = ({ theme }) => {
  const navigate = useNavigate();
  const { users } = useUserContext();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    const foundUserByMail = users.find((user) => user.email === email.value);
    const foundUserByPassword = users.find(
      (user) => user.password === password.value
    );

    if (!foundUserByMail) {
      setError(true);
      return;
    }

    if (!foundUserByPassword) {
      setError(true);
      return;
    }

    try {
      // const { data } = await axios.post(
      //   "http://localhost:1337/api/auth/local",
      //   {
      //     identifier: email.value,
      //     password: password.value,
      //   }
      // );

      // localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("username", foundUserByMail.username);
      localStorage.setItem("id", foundUserByMail.id);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(false);
    }
  };

  return (
    <div
      className={
        theme ? "login-container theme--light" : "login-container theme--dark"
      }
    >
      <div
        className={
          theme
            ? "login-container-wrapper theme--light"
            : "login-container-wrapper theme--dark"
        }
      >
        <Link to="/">
          <img src={theme ? logoLight : logoDark} alt="logo" />
        </Link>
        <h2>Welcome to Randogram</h2>
        <form className="login-container-wrapper-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" />

          <input type="password" placeholder="Password" name="password" />
          {error && <h5 className="error">Email or password is invalid</h5>}
          <button>Log in</button>
        </form>
        <h6>
          Not yet on Randogram ?
          <Link to="/register">
            <span> Sign up</span>
          </Link>
        </h6>
      </div>
    </div>
  );
};

Login.propTypes = {
  theme: PropTypes.bool.isRequired,
};

export default Login;
