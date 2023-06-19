import "./InitialSetup.css";
import Button from "../../components/Button.jsx";
import { useState } from "react";

export default function InitalSetup() {
  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [openDrop3, setOpenDrop3] = useState(false);

  const handleClick = (event) => {
    if (event.target.id == "choose-avatar") {
      setOpenDrop1(!openDrop1);
      setOpenDrop2(false);
      setOpenDrop3(false);
    }
    if (event.target.id == "point-preferences") {
      setOpenDrop1(false);
      setOpenDrop2(!openDrop2);
      setOpenDrop3(false);
    }
    if (event.target.id == "privacy-settings") {
      setOpenDrop1(false);
      setOpenDrop2(false);
      setOpenDrop3(!openDrop3);
    }
  };

  return (
    <>
      <h1>Initial setup</h1>
      <img src="https://fakeimg.pl/304x423/e6bde6/878487" />
      <div className="flex">
        <div className={openDrop1 ? "dropdown-clicked" : "dropdown "}>
          <button
            className="dropbtn btn"
            type="button"
            id="choose-avatar"
            onClick={handleClick}
          >
            choose avatar
          </button>
          <div
            className={
              openDrop1 ? "dropdown-content-clicked" : "dropdown-content"
            }
          >
            <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
            <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
            <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
            <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
            <button className="btn" type="button">
              upload Picture
            </button>
          </div>
        </div>
        <div className={openDrop2 ? "dropdown-clicked" : "dropdown "}>
          <button
            className="dropbtn btn"
            type="button"
            id="point-preferences"
            onClick={handleClick}
          >
            point preferences
          </button>
          <div
            className={
              openDrop2 ? "dropdown-content-clicked" : "dropdown-content"
            }
          ></div>
        </div>
        <div className={openDrop3 ? "dropdown-clicked" : "dropdown "}>
          <button
            className="dropbtn btn"
            type="button"
            id="privacy-settings"
            onClick={handleClick}
          >
            privacy settings
          </button>
          <div
            className={
              openDrop3 ? "dropdown-content-clicked" : "dropdown-content"
            }
          ></div>
        </div>
      </div>
    </>
  );
}
