import { useContext } from 'react';
import { createContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useEffect } from 'react';

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [lightMode, setLightMode] = useState(true);

  useEffect(() => {
    if (user) {
      setLightMode(user.settings.darkMode);
    }
  }, [user]);

  const toggleLightMode = () => {
    if (!lightMode) {
      document.body.classList.add('light');
      setLightMode(true);
    } else {
      document.body.classList.remove('light');
      setLightMode(false);
    }
  };

  return <ThemeContext.Provider value={{ lightMode, setLightMode, toggleLightMode }}>{children}</ThemeContext.Provider>;
}
