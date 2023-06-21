import "./InitialSetup.css";
import { useState, useRef } from "react";
import InitialSetupGraphic from "./InitialSetupGraphic";
import Button from "../../components/Button";
import ButtonHallow from "../../components/ButtonHallow";
import CloseIcon from "../../components/CloseIcon";
import ToggleSwitch from "../../components/ToggleSwitch";

export default function InitalSetup() {
  const avatarDialog = useRef(null);
  const preferenceDialog = useRef(null);
  const privacyDialog = useRef(null);
  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [openDrop3, setOpenDrop3] = useState(false);

  const handleClick = (event) => {
    if (event.target.innerHTML == "choose avatar") {
      if (openDrop1) {
        avatarDialog.current.close();
      } else {
        avatarDialog.current.show();
      }
      setOpenDrop1(!openDrop1);
      setOpenDrop2(false);
      setOpenDrop3(false);
    }
    if (event.target.innerHTML == "point preferences") {
      if (openDrop1) {
        preferenceDialog.current.close();
      } else {
        preferenceDialog.current.show();
      }
      setOpenDrop1(false);
      setOpenDrop2(!openDrop2);
      setOpenDrop3(false);
    }
    if (event.target.innerHTML == "privacy settings") {
      if (openDrop1) {
        privacyDialog.current.close();
      } else {
        privacyDialog.current.show();
      }
      setOpenDrop1(false);
      setOpenDrop2(false);
      setOpenDrop3(!openDrop3);
    }
  };

  const handleClickaway = () => {
    avatarDialog.current.close();
    preferenceDialog.current.close();
    privacyDialog.current.close();
    setOpenDrop1(false);
    setOpenDrop2(false);
    setOpenDrop3(false);
  };
  return (
    <>
      <div
        className={
          openDrop1 || openDrop2 || openDrop3 ? "showClickAway" : "hide"
        }
        onClick={handleClickaway}
      ></div>
      <div className="container">
        <div className="first_element">
          <h1 className="title">Initial setup</h1>
          <InitialSetupGraphic />
        </div>
        <div className="second_element">
          <div className="inital_setup_form">
            <ButtonHallow txt="choose avatar" func={handleClick} />
            <dialog ref={avatarDialog} className={openDrop1 ? "modal" : null}>
              <h2 className="title">Choose Avatar</h2>
              <CloseIcon func={handleClickaway} />
              <div className="modal_container">
                <div className="avatars">
                  <img src="../../assets/defaultavatar/01.jpg" />
                  <img src="../../assets/defaultavatar/02.jpg" />
                  <img src="../../assets/defaultavatar/03.jpg" />
                  <img src="../../assets/defaultavatar/04.jpg" />
                  <img src="../../assets/defaultavatar/05.jpg" />
                  <img src="../../assets/defaultavatar/06.jpg" />
                  <img src="../../assets/defaultavatar/07.jpg" />
                  <img src="../../assets/defaultavatar/08.jpg" />
                  <img src="../../assets/defaultavatar/09.jpg" />
                  <img src="../../assets/defaultavatar/10.jpg" />
                  <img src="../../assets/defaultavatar/11.jpg" />
                  <img src="../../assets/defaultavatar/12.jpg" />
                </div>
                <button className="btn inital_setup_upload" type="button">
                  <span>+ upload Picture</span>
                </button>
              </div>
            </dialog>
            <ButtonHallow txt="point preferences" func={handleClick} />
            <dialog
              ref={preferenceDialog}
              className={openDrop2 ? "modal" : null}
            >
              <h2 className="title">Point preferences</h2>
              <CloseIcon func={handleClickaway} />
              <div className="modal_container">
                <form action="">
                  <p for="fname">
                    Add types of points of interest as preferred:
                  </p>
                  <br />
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Castles, Sports, Restraunts"
                  />
                  <br />
                </form>
              </div>
            </dialog>
            <ButtonHallow txt="privacy settings" func={handleClick} />
            <dialog ref={privacyDialog} className={openDrop3 ? "modal" : null}>
              <h2 className="title">Privacy settings</h2>
              <CloseIcon func={handleClickaway} />
              <div className="initial_setup_privacy">
                <h3>Can be found by</h3>
                <div className="initial_setup_radio">
                  <label>
                    <input type="radio" name="found-by" value="all" />
                    All
                  </label>

                  <label>
                    <input type="radio" name="found-by" value="friends" />
                    Friends
                  </label>

                  <label>
                    <input type="radio" name="found-by" value="none" />
                    None
                  </label>
                </div>
              </div>
              <div className="initial_setup_toggle">
                <h3>Location Services</h3>
                <ToggleSwitch />
                {/* <label class="switch" for="switch">
                  <input type="checkbox" id="switch" />
                  <span class="slider round"></span>
                </label> */}
              </div>
              <div className="initial_setup_toggle">
                <h3>Show email</h3>
                <ToggleSwitch />
                {/* <label class="switch" for="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label> */}
              </div>
              <div className="initial_setup_toggle">
                <h3>Show name</h3>
                <ToggleSwitch />
                {/* <label class="switch" for="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label> */}
              </div>
            </dialog>
            <Button
              txt="done"
              // onClick={handleDone}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
