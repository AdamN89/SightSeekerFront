import "./InitialSetup.css";
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
    <div className="center">
      <h1>Initial setup</h1>
      <img className="initial-settings-page_img" src="https://fakeimg.pl/304x423/e6bde6/878487" />
      <div className="flex-collumn">
        <div className={openDrop1 ? "dropdown-clicked" : "dropdown "}>
            <button
              className="dropbtn btn_hallow"
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
            <div className="avatars">
            <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
            <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
            <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
            <img src="https://fakeimg.pl/128x128/e6bde6/878487" /></div>
            <button className="btn upload" type="button">
              + upload Picture
            </button>
          </div>
        </div>
        <div className={openDrop2 ? "dropdown-clicked" : "dropdown "}>
          <button
            className="dropbtn btn_hallow"
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
          >
            <form action="">
              <label for="fname">Filter suggested points of interest by:</label>
              <br/>
              <input type="text" id="fname" name="fname" placeholder="Castles, Sports, Restraunts" />
              <br/>
            </form>
          </div>
        </div>
        <div className={openDrop3 ? "dropdown-clicked" : "dropdown "}>
          <button
            className="dropbtn btn_hallow"
            type="button"
            id="privacy-settings"
            onClick={handleClick}
          >
            privacy settings
          </button>
          <div
            className={
              openDrop3 ? "dropdown-content-clicked flex-collumn" : "dropdown-content"
            }
          >
            <div className="flex">
              <h3>Can be found by</h3>
              <div className="flex-collumn">
              <label class="container">All
                <input type="radio" name="found-by"/>
                <span class="checkmark"></span>
              </label>

              <label class="container">Friends
                <input type="radio" name="found-by"/>
                <span class="checkmark"></span>
              </label>

              <label class="container">
                None
                <input type="radio" name="found-by"/>
                <span class="checkmark"></span>
              </label>
              </div>
            </div>
            <div className="flex">
              <h3>Location Services</h3>
              <label class="switch">
                <input type="checkbox"/>
                <span class="slider round"></span>
              </label>
            </div>
            <div className="flex">
              <h3>Show email</h3>
              <label class="switch">
                <input type="checkbox" checked="true"/>
                <span class="slider round"></span>
              </label>
            </div>
            <div className="flex">
              <h3>Show name</h3>
              <label class="switch">
                <input type="checkbox"/>
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <button
            className="btn"
            type="button"
            id="privacy-settings"
            // onClick={handleDone}
          >
            DONE
          </button>
      </div>
      </div>
    </>
  );
}
