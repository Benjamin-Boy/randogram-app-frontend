import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
