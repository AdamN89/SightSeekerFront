import "./InitialSetup.css";
import { useState, useRef } from "react";
import InitialSetupGraphic from "./InitialSetupGraphic";
import Button from "../../components/Button";
import ButtonHallow from "../../components/ButtonHallow";
import { Formik, Form, Field } from "formik";
import { async } from "q";
import CloseIcon from "../../components/CloseIcon";
import ToggleSwitch from "../../components/ToggleSwitch";
const initialSetupValues = {
  poi: ["Hi"],
  foundBy: "all",
  locationServices: false,
  showEmail: false,
  showName: false,
};

export default function InitalSetup() {
  const avatarDialog = useRef(null);
  const poiDialog = useRef(null)
  const privacyDialog = useRef(null)
  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [openDrop3, setOpenDrop3] = useState(false);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkZmJlMDcyNDlhNzQ3ODIwNjlkMDkiLCJpYXQiOjE2ODczNjQ3NjUsImV4cCI6MTY4NzQ1MTE2NX0.SYC466Ra-_MohmITlX2FlYDJ06pJ5_tLK0DrwGESlx4"
  const handleFormSubmit = async (values) => {
    await saveInitialSettings(values)
  }

  const handleSubmitButtonClick = async (submitForm) => {
    await submitForm();
  };

  const saveInitialSettings = async (values) => {
    console.log(values)
    try {
      const response = await fetch("http://localhost:8080/user/initalsettings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const user = await response.json();
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
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
      if(openDrop1){
        poiDialog.current.close()
      }
      else{
        poiDialog.current.show()
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

  const handleClickaway= ()=>{
    avatarDialog.current.close()
    poiDialog.current.close()
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
        <InitialSetupGraphic />
      </div>
      <div className="second_element">
        
      <Formik
                initialValues={initialSetupValues}
                onSubmit={handleFormSubmit}
        >
                        {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                submitForm,
                /* and other goodies */
              }) => (
                <Form onSubmit={handleSubmit}>
        <div className="inital_setup_form">
              <ButtonHallow
              txt="choose avatar"
                func={handleClick}
              />
            <dialog ref={avatarDialog}
              className={
                openDrop1 ? "modal" : null
              }
            >
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
            <ButtonHallow
              txt="point preferences"
              func={handleClick}
            />
            <dialog ref={poiDialog} 
              className={
                openDrop2 ?  "modal" : null
              }
            >
                            <h2 className="title">Point preferences</h2>
              <CloseIcon func={handleClickaway} />
              <div className="modal_container">

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
              </div>
            </dialog>
            <ButtonHallow
              txt="privacy settings"
              func={handleClick}
            />
            <dialog ref={privacyDialog} 
              className={
                openDrop3 ?  "modal" : null
              }>
              <h2 className="title">Privacy settings</h2>
              <CloseIcon func={handleClickaway} />
              <div className="initial_setup_privacy">
                <h3>Can be found by</h3>
                <div className="initial_setup_radio">
                <label >
                  <Field type="radio" name="foundBy" value="all"/>All

                </label>

                    <label>
                      
                      <Field type="radio" name="foundBy" value="friends"/>Friends

                    </label>

                    <label >
                      
                      <Field type="radio" name="foundBy" value="none"/>None
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="initial_setup_toggle">
                  <h3>Location Services</h3>
                  <label class="toggle">
                    <Field type="checkbox" className="toggle_checkbox" name="locationServices"/>
                    <div class="toggle_switch"></div>
                  </label>

                </div>
                <div className="initial_setup_toggle">
                  <h3>Show email</h3>
                  <label class="toggle">
                    <Field type="checkbox" className="toggle_checkbox" name="showEmail"/>
                    <div class="toggle_switch"></div>
                  </label>
                </div>
                <div className="initial_setup_toggle">
                  <h3>Show name</h3>
                  <label class="toggle">
                    <Field type="checkbox" className="toggle_checkbox" name="showName"/>
                    <div class="toggle_switch"></div>
                  </label>
                </div>
              </dialog>
            <Button
              txt="done"
              onClick={handleSubmitButtonClick}
            >
            </Button>
        </div>
        </Form>
              )}
        </Formik>
      </div>
      </div>
    </>
  );
}
