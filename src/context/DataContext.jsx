import { createContext, useRef, useState, useState } from "react";
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
    console.log(menuRef.current.parentNode);
    menuRef.current.classList.remove("navigaton_page_not_visible");
    menuRef.current.parentNode.classList.add("navigation_wrapper--up");
    menuRef.current.classList.add("navigaton_page_visible");
    menuRef.current.classList.add("navigaton_page_opening");
    setTimeout(() => {
      menuRef.current.classList.remove("navigaton_page_opening");
    }, 500);
  };

  const closeMenu = (menuRef) => {
    menuRef.current.classList.add("navigaton_page_closing");
    console.log(menuRef.current.classList);
    setTimeout(() => {
      menuRef.current.parentNode.classList.remove("navigation_wrapper--up");
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
    // console.log(topMenuRef.current);
    setTimeout(() => {
      setIsOpenTopMenu(false);
      topMenuRef.current.classList.remove("closing");
    }, 700);
  };

    return(
        <DataContext.Provider value={{
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
          currentChat, setCurrentChat, sendMessage, setSendMessage, receiveMessage, setReceiveMessage
        }}>
            {children}
        </DataContext.Provider>
    )
}
