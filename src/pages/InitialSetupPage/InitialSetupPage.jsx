import "./InitialSetup.css";
import { useState, useRef } from "react";
import Button from "../../components/Button";
import ButtonHallow from "../../components/ButtonHallow";


export default function InitalSetup() {
  const avatarDialog = useRef(null);
  const preferenceDialog = useRef(null)
  const privacyDialog = useRef(null)
  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [openDrop3, setOpenDrop3] = useState(false);

  const handleClick = (event) => {
    
    if (event.target.innerHTML == "choose avatar") {
      if(openDrop1){
        avatarDialog.current.close()
      }
      else{
        avatarDialog.current.show()
      }
      setOpenDrop1(!openDrop1);
      setOpenDrop2(false);
      setOpenDrop3(false);
    }
    if (event.target.innerHTML == "point preferences") {
      if(openDrop1){
        preferenceDialog.current.close()
      }
      else{
        preferenceDialog.current.show()
      }
      setOpenDrop1(false);
      setOpenDrop2(!openDrop2);
      setOpenDrop3(false);
    }
    if (event.target.innerHTML == "privacy settings") {
      if(openDrop1){
        privacyDialog.current.close()
      }
      else{
        privacyDialog.current.show()
      }
      setOpenDrop1(false);
      setOpenDrop2(false);
      setOpenDrop3(!openDrop3);
    }
  };

  const handleClickaway= ()=>{
    avatarDialog.current.close()
    preferenceDialog.current.close()
    privacyDialog.current.close()
    setOpenDrop1(false);
    setOpenDrop2(false);
    setOpenDrop3(false);
  }
  return (
    <>
    <div className={openDrop1 || openDrop2 || openDrop3 ? "showClickAway" : "hide"} onClick={handleClickaway}></div>
    <div className="container">
        <h1 className="title">Initial setup</h1>
      <div className="first_element">
        <img className="initial-settings-page_img" src="https://fakeimg.pl/304x423/e6bde6/878487" />
      </div>
      <div className="second_element">
        <div className="inital_setup_flex_collumn">
              <ButtonHallow
              txt="choose avatar"
                className="dropbtn"
                func={handleClick}
              />
            <dialog ref={avatarDialog}
              className={
                openDrop1 ? "modal" : null
              }
            >
              <div className="model_container">
                <div className="avatars">
                <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
                <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
                <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
                <img src="https://fakeimg.pl/128x128/e6bde6/878487" />
                </div>
                <button className="btn upload" type="button">
                  + upload Picture
                </button>
              </div>
            </dialog>
            <ButtonHallow
              className="dropbtn"
              txt="point preferences"
              func={handleClick}
            />
            <dialog ref={preferenceDialog} 
              className={
                openDrop2 ?  "modal" : null
              }
            >
              <div className="model_container">
                <form action="">
                  <label for="fname">Filter suggested points of interest by:</label>
                  <br/>
                  <input type="text" id="fname" name="fname" placeholder="Castles, Sports, Restraunts" />
                  <br/>
                </form>
              </div>
            </dialog>
            <ButtonHallow
              className="dropbtn"
              txt="privacy settings"
              func={handleClick}
            />
            <dialog ref={privacyDialog} 
              className={
                openDrop3 ?  "modal" : null
              }
            >
              <div className="inital_setup_flex">
                <h3>Can be found by</h3>
                <div className="inital_setup_flex_collumn">
                <label class="settings_container">All
                  <input type="radio" name="found-by"/>
                  <span class="checkmark"></span>
                </label>

                    <label class="settings_container">
                      Friends
                      <input type="radio" name="found-by" />
                      <span class="checkmark"></span>
                    </label>

                    <label class="settings_container">
                      None
                      <input type="radio" name="found-by" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="inital_setup_flex">
                  <h3>Location Services</h3>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div className="inital_setup_flex">
                  <h3>Show email</h3>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div className="inital_setup_flex">
                  <h3>Show name</h3>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </dialog>
            <Button
              txt="done"
              // onClick={handleDone}
            >
            </Button>
        </div>
      </div>
      </div>
    </>
  );
}
