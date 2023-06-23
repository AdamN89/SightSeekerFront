import "./InitialSetup.css";
import { useState, useRef, useContext } from "react";
import InitialSetupGraphic from "./InitialSetupGraphic";
import Button from "../../components/Button";
import ButtonHallow from "../../components/ButtonHallow";
import { Formik, Form, Field } from "formik";
import CloseIcon from "../../components/CloseIcon";
import{ DataContext} from "../../context/DataContext";

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
  const [uploadedImgFile, setUploadedImgFile] = useState(undefined)
  const [uploadedImgURL, setUploadedImgURL] = useState("")
  const [theChosenOne, setTheChosenOne] = useState("https://res.cloudinary.com/dokiz6udc/image/upload/v1687449571/02_v1rulc.jpg")

  const {avatars} = useContext(DataContext)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkZjY2MWY0OGZiOWIzMjEzYTgzMWEiLCJpYXQiOjE2ODc1MzUzNTQsImV4cCI6MTY4NzYyMTc1NH0.8cQ_DB36kBNLxsXM8yri19IniaL7LVUzFXGoRO1Cbig"

  const handleFormSubmit = async (values) => {
    await saveInitialSettings(values)
  }

  const handleSubmitButtonClick = async (submitForm) => {
    await submitForm();
  };

  const submitAvatar = async (theChosenOne) => {
    if(uploadedImgURL === theChosenOne){
      const formData = new FormData();
      formData.append("avatar", uploadedImgFile);
      try{
      const response = await fetch("http://localhost:8080/user/avatar", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
        });
      if (response.ok){
        const responseData = await response.json();
        console.log(responseData)
      } else{
        console.log("Error")
      }
      }catch(error){
        console.error("Error", error);
      }
    }
    else{
      try{
        const response = await fetch("http://localhost:8080/user/default_avatar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({avatar: theChosenOne}),
        });
      if (response.ok){
        const responseData = await response.json();
        console.log(responseData)
      } else{
        console.log("Error")
      }
      }catch(error){
        console.error("Error", error);
      }
    }
  }

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
        const responseData = await response.json();
        console.log(responseData)
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

  const handleCloseModel = () => {
    avatarDialog.current.close()
    poiDialog.current.close()
    privacyDialog.current.close()
    setOpenDrop1(false);
    setOpenDrop2(false);
    setOpenDrop3(false);
  }

  const handleChosenOne = (event) => {
    setTheChosenOne(event.target.src)
  }

  const handleSaveSelectedAvatar = (event) => {
    console.log("trogger")
    handleCloseModel()
    submitAvatar(theChosenOne)
  }

  const addAvatar= (event)=>{
    setUploadedImgFile(event.target.files[0])
    setUploadedImgURL(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <>
    <div className={openDrop1 || openDrop2 || openDrop3 ? "showClickAway" : "hide"} onClick={handleCloseModel}></div>
    <div className="container">
      <h1 className="title">Initial setup</h1>
      <div className="first_element">
        <InitialSetupGraphic />
      </div>
      <div className="second_element">
        
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
              <CloseIcon func={handleCloseModel} />
              <div className="modal_container avatars">
                <div className="avatars">
                {avatars?.map((avatar, index) => <img className={theChosenOne === avatar? "selectedAvatar": "" } src={avatar} onClick={handleChosenOne}/>)}
                {uploadedImgURL?.length > 0? <img src={uploadedImgURL} className={theChosenOne === uploadedImgURL? "selectedAvatar": "" } onClick={handleChosenOne}/>: ""}
                </div>
                <label for="uploadButton" className="btn inital_setup_upload">+ Upload Image</label>
                <Button txt="Save" func={handleSaveSelectedAvatar}/>
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
              <CloseIcon func={handleCloseModel} />
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
            <dialog ref={privacyDialog} 
              className={
                openDrop3 ?  "modal" : null
              }>
              <h2 className="title">Privacy settings</h2>
              <CloseIcon func={handleCloseModel} />
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
                <Button txt="save Changes" func={handleSubmitButtonClick}/>
              </dialog>
            <Button
              txt="done"
            >
            </Button>
        </Form>
              )}
        
        </Formik>
        <input onChange={addAvatar} type="file" id="uploadButton"/>
      </div>
      </div>
    </>
  );
}
