import "./settings.css";
import { useContext, useState, useRef, useEffect } from "react";
import Button from "../../components/Button";
import ButtonDelete from "../../components/ButtonDelete";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import EditIcon from "../../components/EditIcon";
import CloseIcon from "../../components/CloseIcon";
import { useNavigate } from "react-router-dom";
import UploadButton from "../../components/UploadButton";
import ButtonInstall from "../../components/ButtonInstall";
import InstallButton from "../../components/AddToHomeScreenButton";

export default function Settings() {
  const { token, user, setUser, backendURL } = useContext(AuthContext);
  const { avatars } = useContext(DataContext);

  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [openDrop3, setOpenDrop3] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [typedPassword1, setTypedPassword1] = useState("");
  const [typedPassword2, setTypedPassword2] = useState("");

  const avatarDialog = useRef(null);
  const nameDialog = useRef(null);
  const passwordDialog = useRef(null);

  const [modalHeight, setModalHeight] = useState(0);
  const [uploadedImgFile, setUploadedImgFile] = useState(undefined);
  const [uploadedImgURL, setUploadedImgURL] = useState("");
  const [theChosenOne, setTheChosenOne] = useState(
    "https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/02_v1rulc.jpg"
  );
  const navigate = useNavigate();

  console.log(user);
  const initialSetupValues = {
    darkMode: user?.settings.darkMode,
    foundBy: user?.settings.foundBy,
    locationServices: user?.settings.locationServices,
    showEmail: user?.settings.showEmail,
    showName: user?.settings.showName,
  };

  const handleFormSubmit = async (values) => {
    await saveChangedSettings(values);
  };

  const handleSubmitButtonClick = async (submitForm) => {
    await submitForm();
  };

  const backToMain = () => {
    navigate("/home");
  };

  const submitNewAvatar = async (theChosenOne) => {
    if (uploadedImgURL === theChosenOne) {
      const formData = new FormData();
      formData.append("avatar", uploadedImgFile);
      try {
        const response = await fetch("http://localhost:8080/user/avatar", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (response.ok) {
          const responseData = await response.json();
          setUser(responseData.data);
          console.log(responseData);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:8080/user/default_avatar",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ avatar: theChosenOne }),
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setUser(responseData.data);
          console.log(responseData);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const submitNewName = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/changeName", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: typedName }),
      });
      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData.data);
        console.log(responseData);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const submitNewPassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/user/changePassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: typedPassword1 }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData.data);
        console.log(responseData);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const saveChangedSettings = async (values) => {
    console.log(values);
    try {
      const response = await fetch(`${backendURL}/user/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData.data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleClick = (event) => {
    console.log("handleclick triggered");
    event.preventDefault();
    console.log(event.target.name);
    if (event.target.name == "changeAvatar") {
      if (openDrop1) {
        avatarDialog.current.close();
      } else {
        avatarDialog.current.show();
      }
      setOpenDrop1(!openDrop1);
      setOpenDrop2(false);
      setOpenDrop3(false);
    }
    if (event.target.name == "changeName") {
      if (openDrop1) {
        nameDialog.current.close();
      } else {
        nameDialog.current.show();
      }
      setOpenDrop1(false);
      setOpenDrop2(!openDrop2);
      setOpenDrop3(false);
    }
    if (event.target.name == "changePassword") {
      if (openDrop1) {
        passwordDialog.current.close();
      } else {
        passwordDialog.current.show();
      }
      setOpenDrop1(false);
      setOpenDrop2(false);
      setOpenDrop3(!openDrop3);
    }
  };

  const handleCloseModel = () => {
    avatarDialog.current.close();
    nameDialog.current.close();
    passwordDialog.current.close();
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
      submitNewAvatar(theChosenOne);
    }
  };

  const handleSaveName = (event) => {
    event.preventDefault();
    //if success
    if (typedName.length > 0) {
      submitNewName();
      handleCloseModel();
    } else {
      alert("nothing to submit");
    }
  };

  const handleSavePassword = (event) => {
    event.preventDefault();
    //validate?
    if (typedPassword1.length > 0) {
      if (typedPassword1 === typedPassword2) {
        submitNewPassword();
        handleCloseModel();
      } else {
        alert("both field do not match");
      }
    } else {
      alert("nothing to submit");
    }
  };

  const addAvatar = (event) => {
    if (event.target.files[0]) {
      setUploadedImgFile(event.target.files[0]);
      setUploadedImgURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  const deleteAccont = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(),
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

  return (
    <>
      <div
        className={
          openDrop1 || openDrop2 || openDrop3 ? "showClickAway" : "hide"
        }
        onClick={handleCloseModel}
      ></div>
      <div className="container settings_page">
        <button
          className="settings_page_close_btn"
          onClick={() => navigate("/home")}
        >
          <CloseIcon />
        </button>
        <h1 className="title">Settings</h1>
        <div className="settings_page_first_element">
          <div className="settings_page_data">
            <div className="settings_page_data_row">
              <span>name</span>
              <h3>{user?.name}</h3>
              <button
                className="svgButton"
                onClick={handleClick}
                name="changeName"
              >
                <EditIcon />
              </button>
            </div>
            <dialog ref={nameDialog} className={openDrop2 ? "modal" : null}>
              <h2 className="title">Change Name</h2>
              <CloseIcon func={handleCloseModel} />
              <form className="modal_container" onSubmit={handleSaveName}>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => {
                    setTypedName(e.target.value);
                  }}
                />
                <Button txt="Save" />
              </form>
            </dialog>
            <div className="settings_page_data_row">
              <span>user name</span>
              <h3>{user.userName}</h3>
            </div>
            <div className="settings_page_data_row">
              <span>email</span>
              <h3>{user.email}</h3>
            </div>
            <div className="settings_page_data_row">
              <span>change</span>
              <h3>password</h3>
              <button
                className="svgButton"
                onClick={handleClick}
                name="changePassword"
              >
                <EditIcon />
              </button>
            </div>
            <dialog ref={passwordDialog} className={openDrop3 ? "modal" : null}>
              <h2 className="title">Change Password</h2>
              <CloseIcon func={handleCloseModel} />

              <form className="modal_container" onSubmit={handleSavePassword}>
                <input
                  value={typedPassword1}
                  onChange={(e) => setTypedPassword1(e.target.value)}
                />
                <input
                  value={typedPassword2}
                  onChange={(e) => setTypedPassword2(e.target.value)}
                />
                <Button txt="Save" />
              </form>
            </dialog>
          </div>
          <div className="avatar">
            <img src={user.avatar} onClick={handleClick} name="changeAvatar" />
          </div>
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
        </div>
        <InstallButton />
        <ButtonInstall />
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
              <Form
                className="settings_page_preference"
                onSubmit={handleSubmit}
              >
                <div className="settings_page_customise">
                  <h2 className="title">Customise</h2>
                  <div className="settings_page_toggle">
                    <h3>Darkmode</h3>
                    <label class="toggle">
                      <Field
                        type="checkbox"
                        className="toggle_checkbox"
                        name="darkMode"
                      />
                      <div class="toggle_switch"></div>
                    </label>
                  </div>
                </div>
                <div>
                  <div className="settings_page_privacy">
                    <h2 className="title">Privacy</h2>
                    <h3>Can be found by</h3>
                    <div className="settings_page_radio">
                      <label>
                        <Field type="radio" name="foundBy" value="all" />
                        All
                      </label>
                      <label>
                        <Field type="radio" name="foundBy" value="friends" />
                        Friends
                      </label>
                      <label>
                        <Field type="radio" name="foundBy" value="none" />
                        None
                      </label>
                    </div>
                  </div>
                  <div className="settings_page_toggle">
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
                  <div className="settings_page_toggle">
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
                  <div className="settings_page_toggle">
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
                </div>
                <Button
                  txt="done"
                  onClick={handleSubmitButtonClick}
                  func={backToMain}
                ></Button>
              </Form>
            )}
          </Formik>
          <ButtonDelete txt={"delete account"} func={deleteAccont} />
          <input onChange={addAvatar} type="file" id="uploadButton" />
        </div>
      </div>
    </>
  );
}
