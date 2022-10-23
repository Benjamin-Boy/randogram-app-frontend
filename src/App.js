// Imports React Properties/packages
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

// Imports React Components
import Home from "./pages/Home";
import Create from "./pages/Create";
import SingleTrek from "./pages/SingleTrek";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import Profile from "./pages/Profile";
import Treks from "./pages/Treks";
import Bookmarks from "./pages/Bookmarks";
import HeaderSharedLayout from "./pages/HeaderSharedLayout";
import Error from "./pages/Error";
import Loader from "./components/Loader/Loader";

// Imports custom contexts
import { useThemeContext } from "./context/ThemeContext";
import { useTrekContext } from "./context/TrekContext";
import { useUserContext } from "./context/UserContext";

const App = () => {
  const { treks, isLoading } = useTrekContext();
  const { theme, toggleTheme } = useThemeContext();
  const { users } = useUserContext();

  const [currentUser, setCurrentUser] = useState({});
  const [activeAvatar, setActiveAvatar] = useState(false);

  const addActive = () => {
    setActiveAvatar(!activeAvatar);
  };

  const getCurrentUser = () => {
    const user = users.find(
      (user) => user.id === parseInt(localStorage.getItem("id"))
    );

    setCurrentUser(user);
  };

  useEffect(() => {
    if (users.length > 0) {
      getCurrentUser();
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <HeaderSharedLayout
              addActive={addActive}
              activeAvatar={activeAvatar}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        >
          <Route index element={<Home theme={theme} />} />
          <Route
            path="/create"
            element={<Create theme={theme} currentUser={currentUser} />}
          />
          <Route
            path="/treks"
            element={<Treks treks={treks} theme={theme} />}
          />
          <Route path="/bookmarks" element={<Bookmarks theme={theme} />} />
          <Route
            path="/treks/:id"
            element={
              treks.length > 0 && <SingleTrek theme={theme} treks={treks} />
            }
          />
        </Route>

        <Route path="/login" element={<Login theme={theme} />} />
        <Route path="/register" element={<Register theme={theme} />} />
        <Route path="/logout" element={<Logout theme={theme} />} />
        <Route path="/profile" element={<Profile theme={theme} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
