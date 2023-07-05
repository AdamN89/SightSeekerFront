import { useContext } from "react";
import { createContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [lightMode, setLightMode] = useState(true);

  useEffect(() => {
    if (user) {
      setLightMode(user.settings.darkMode);
    }
  }, [user]);

  console.log(lightMode);

  const toggleLightMode = () => {
    if (!lightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  };

  useEffect(() => {
    toggleLightMode();
  }, [lightMode]);

  return (
    <ThemeContext.Provider value={{ lightMode, setLightMode, toggleLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
