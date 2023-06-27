import { createContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const avatars = [
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/01_xtix8i.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/02_v1rulc.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/03_h4ptfr.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/04_nfzjs7.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/05_y0j4qs.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/06_x12196.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/07_wduulo.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/08_cbriqj.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/09_dlin3a.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/10_ipwhbm.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/11_l5omrg.jpg",
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449572/12_wggivu.jpg",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTopMenu, setIsOpenTopMenu] = useState(false);
  const topMenuRef = useRef(null);

  const openMenu = (menuRef) => {
    if (isOpen === false)
      menuRef.current.classList.add("navigaton_page_opening");
    setIsOpen(!isOpen);
    setTimeout(() => {
      menuRef.current.classList.remove("navigaton_page_opening");
    }, 500);
    console.log("click is working");
  };

  const closeMenu = (menuRef) => {
    menuRef.current.classList.add("navigaton_page_closing");
    setTimeout(() => {
      setIsOpen(!isOpen);
      menuRef.current.classList.remove("navigaton_page_closing");
    }, 700);
  };

  const openTopMenu = () => {
    topMenuRef.current.classList.add("opening");
    setIsOpenTopMenu(true);
    setTimeout(() => {
      topMenuRef.current.classList.remove("opening");
    }, 500);
    console.log("click is working");
  };

  const closeTopMenu = () => {
    topMenuRef.current.classList.add("closing");
    console.log(topMenuRef.current);
    setTimeout(() => {
      setIsOpenTopMenu(false);
      topMenuRef.current.classList.remove("closing");
    }, 700);
  };

  return (
    <DataContext.Provider
      value={{
        avatars,
        openMenu,
        closeMenu,
        isOpen,
        setIsOpen,
        openTopMenu,
        closeTopMenu,
        isOpenTopMenu,
        setIsOpenTopMenu,
        topMenuRef,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
