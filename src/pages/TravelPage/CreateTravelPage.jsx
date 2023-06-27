import "./TravelsPage.css";
import TravelPlanIcon from "../../components/NavigationIcons/TravelPlanIcon";
import CloseIcon from "../../components/CloseIcon";
import { useRef, useState } from "react";
import TravelSearchBar from "./TravelSearchBar";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function CreateTravelPage() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const openMenu = () => {
    if (isOpen === false) menuRef.current.classList.add("chatopening");
    setIsOpen(!isOpen);
    setTimeout(() => {
      menuRef.current.classList.remove("chatopening");
    }, 500);
    console.log("click is working");
  };

  const closeMenu = () => {
    menuRef.current.classList.add("chatclosing");
    setTimeout(() => {
      setIsOpen(!isOpen);
      menuRef.current.classList.remove("chatclosing");
    }, 700);
  };

  return (
    <>
      <button className="main_menu_btn" onClick={openMenu}>
        <TravelPlanIcon />
      </button>
      <div
        className="navigation_wrapper"
        style={{
          transform: isOpen ? `translateY(${0}px)` : `translateY(${-1000}px)`,
        }}
      >
        <div
          className="navigation_wrapper_body"
          ref={menuRef}
          style={{ opacity: isOpen ? 2 : 0 }}
        >
          <div className="navigation_wrapper_body_header">
            <h1 className="title">Travel Plans</h1>
            <button className="navigation_close_btn" onClick={closeMenu}>
              <CloseIcon />
            </button>
          </div>
          <TravelSearchBar />
          {/* start of content of navigation page */}
          <Button
            txt={"Create new travel plan"}
            func={() => navigate("/login")}
            key="login"
          />
          {/* end of content of navigation page */}
        </div>
      </div>
    </>
  );
}
