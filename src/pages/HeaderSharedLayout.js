import { useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

// Imports React components
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const HeaderSharedLayout = ({
  addActive,
  activeAvatar,
  theme,
  toggleTheme,
}) => {
  // const [sidebarOpen, setSidebarOpen] = useState();

  const sidebarOpen = false;

  return (
    <>
      {sidebarOpen ? (
        <Sidebar
          addActive={addActive}
          activeAvatar={activeAvatar}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <Header
          addActive={addActive}
          activeAvatar={activeAvatar}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
      <Outlet />
    </>
  );
};

HeaderSharedLayout.propTypes = {};

export default HeaderSharedLayout;
