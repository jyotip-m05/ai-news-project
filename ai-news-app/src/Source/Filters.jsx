import { createContext, useContext, useState } from "react";
import {getPref, setPref} from "./PrefManager.jsx";

// Create the context with initial default values
const ThemeContext = createContext({
  dark: getPref('darkMode'),
  handleMode: () => {}
});

// Create a provider component
function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getPref('darkMode') || false);
  
  const handleMode = () => {
    setPref('darkMode', !dark);
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, handleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme
const useTheme = () => useContext(ThemeContext);
export { useTheme, ThemeProvider };