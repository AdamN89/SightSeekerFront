import "./InitialSetup.css";
import { useState, useRef, useEffect, useContext } from "react";
import InitialSetupGraphic from "./InitialSetupGraphic";
import Button from "../../components/Button";
import ButtonHallow from "../../components/ButtonHallow";
import { Formik, Form, Field } from "formik";
import CloseIcon from "../../components/CloseIcon";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadButton from "../../components/UploadButton";

const initialSetupValues = {
  foundBy: "all",
  locationServices: false,
  showEmail: false,
  showName: false,
};

export default function InitalSetup() {
  const avatarDialog = useRef(null);
  const poiDialog = useRef(null);
  const privacyDialog = useRef(null);
  const [modalHeight, setModalHeight] = useState(0);
  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [openDrop3, setOpenDrop3] = useState(false);
  const [uploadedImgFile, setUploadedImgFile] = useState(undefined);
  const [uploadedImgURL, setUploadedImgURL] = useState("");
  const [theChosenOne, setTheChosenOne] = useState(
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/02_v1rulc.jpg"
  );

  const navigate = useNavigate();
  const { avatars } = useContext(DataContext);
  const { token, backendURL } = useContext(AuthContext);

  const handleFormSubmit = async (values) => {
    await saveInitialSettings(values);
  };

  const handleSubmitButtonClick = async (submitForm) => {
    await submitForm();
    handleCloseModel();
  };

  const submitAvatar = async (theChosenOne) => {
    if (uploadedImgURL === theChosenOne) {
      const formData = new FormData();
      formData.append("avatar", uploadedImgFile);
      try {
        const response = await fetch(`${backendURL}/user/avatar`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      try {
        const response = await fetch(`${backendURL}/user/default_avatar`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatar: theChosenOne }),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const saveInitialSettings = async (values) => {
    console.log(values);
    try {
      const response = await fetch(`${backendURL}/user/initalsettings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.innerHTML === "choose avatar") {
      if (openDrop1) {
        avatarDialog.current.close();
      } else {
        avatarDialog.current.show();
      }
      setOpenDrop1(!openDrop1);
      setOpenDrop2(false);
      setOpenDrop3(false);
    }
    if (event.target.innerHTML === "point preferences") {
      if (openDrop1) {
        poiDialog.current.close();
      } else {
        poiDialog.current.show();
      }
      setOpenDrop1(false);
      setOpenDrop2(!openDrop2);
      setOpenDrop3(false);
    }
    if (event.target.innerHTML === "privacy settings") {
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

  const handleCloseModel = () => {
    avatarDialog.current.close();
    poiDialog.current.close();
    privacyDialog.current.close();
    setOpenDrop1(false);
    setOpenDrop2(false);
    setOpenDrop3(false);
  };

  const fullHeight = "100%";

  useEffect(() => {
    // openDrop1 ? setModalHeight(avatarDialog.current.offsetHeight) : null;
    if (openDrop1) {
      setModalHeight(avatarDialog.current.offsetHeight);
    }
  }, [openDrop1]);

  const calcHeight = `max(${modalHeight + 40}px, 100%)`;
  // console.log(calcHeight);

  const handleChosenOne = (event) => {
    setTheChosenOne(event.target.src);
  };

  const handleSaveSelectedAvatar = (event) => {
    handleCloseModel();
    if (theChosenOne) {
      submitAvatar(theChosenOne);
    }
  };

  const addAvatar = (event) => {
    if (event.target.files[0]) {
      setUploadedImgFile(event.target.files[0]);
      setUploadedImgURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <div
        className={
          openDrop1 || openDrop2 || openDrop3 ? "showClickAway" : "hide"
        }
        onClick={handleCloseModel}
      ></div>
      <div className="container">
        <h1 className="title">Initial setup</h1>
        <div className="first_element">
          <InitialSetupGraphic />
        </div>
        <div className="second_element">
          <div className="inital_setup_form">
            <ButtonHallow txt="choose avatar" func={handleClick} />
            <dialog ref={avatarDialog} className={openDrop1 ? "modal" : null}>
              <h2 className="title">Choose Avatar</h2>
              <CloseIcon func={handleCloseModel} />
              <div className="modal_container avatars">
                <div className="avatars">
                  {avatars?.map((avatar, index) => {
                    return (
                      <img
                        className={
                          theChosenOne === avatar ? "selectedAvatar" : ""
                        }
                        src={avatar}
                        onClick={handleChosenOne}
                      />
                    );
                  })}
                </div>
                <div className="avatars_upload">
                  <div className="avatars_upload_btn">
                    {/* <label
                      for="uploadButton"
                      className="btn inital_setup_upload"
                    >
                      + Upload Image
                    </label> */}
                    <UploadButton txt="+ upload image" />
                    <Button txt="Save" func={handleSaveSelectedAvatar} />
                  </div>
                  {uploadedImgURL?.length > 0 ? (
                    <img
                      src={uploadedImgURL}
                      className={
                        theChosenOne === uploadedImgURL ? "selectedAvatar" : ""
                      }
                      onClick={handleChosenOne}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </dialog>
            <ButtonHallow txt="point preferences" func={handleClick} />
            <dialog ref={poiDialog} className={openDrop2 ? "modal" : null}>
              <h2 className="title">Point preferences</h2>
              <CloseIcon func={handleCloseModel} />
              <div className="modal_container">
                <p for="fname">Add types of points of interest as preferred:</p>
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
            <ButtonHallow txt="privacy settings" func={handleClick} />
          </div>
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
                  <dialog
                    ref={privacyDialog}
                    className={openDrop3 ? "modal" : null}
                  >
                    <h2 className="title">Privacy settings</h2>
                    <CloseIcon func={handleCloseModel} />
                    <div className="initial_setup_privacy">
                      <h3>Can be found by</h3>
                      <div className="initial_setup_radio">
                        <label>
                          All
                          <Field type="radio" name="foundBy" value="all" />
                        </label>

                        <label>
                          Friends
                          <Field type="radio" name="foundBy" value="friends" />
                        </label>

                        <label>
                          None
                          <Field type="radio" name="foundBy" value="none" />
                        </label>
                      </div>
                    </div>
                    <div className="initial_setup_toggle">
                      <h3>Location Services</h3>
                      <label class="toggle">
                        <Field
                          type="checkbox"
                          className="toggle_checkbox"
                          name="locationServices"
                        />
                        <div class="toggle_switch"></div>
                      </label>
                    </div>
                    <div className="initial_setup_toggle">
                      <h3>Show email</h3>
                      <label class="toggle">
                        <Field
                          type="checkbox"
                          className="toggle_checkbox"
                          name="showEmail"
                        />
                        <div class="toggle_switch"></div>
                      </label>
                    </div>
                    <div className="initial_setup_toggle">
                      <h3>Show name</h3>
                      <label class="toggle">
                        <Field
                          type="checkbox"
                          className="toggle_checkbox"
                          name="showName"
                        />
                        <div class="toggle_switch"></div>
                      </label>
                    </div>
                    <Button
                      txt="save Changes"
                      func={() => handleSubmitButtonClick(submitForm)}
                    />
                  </dialog>
                </div>
                <Button
                  txt="done"
                  func={() => {
                    navigate("/home");
                  }}
                ></Button>
              </Form>
            )}
          </Formik>
          <input onChange={addAvatar} type="file" id="uploadButton" />
        </div>
      </div>
    </>
  );
}
