// Imports React Properties
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Imports React Components
import App from "./App";
import ThemeContextProvider from "./context/ThemeContext";
import TrekContextProvider from "./context/TrekContext";
import MediaContextProvider from "./context/MediaContext";
import UserContextProvider from "./context/UserContext";
import FilterContextProvider from "./context/FilterContext";

// Imports Scss Styles
import "./scss/style.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeContextProvider>
    <UserContextProvider>
      <TrekContextProvider>
        <FilterContextProvider>
          <MediaContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MediaContextProvider>
        </FilterContextProvider>
      </TrekContextProvider>
    </UserContextProvider>
  </ThemeContextProvider>
);
