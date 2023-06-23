import "./settings.css";
import { useContext, useState } from "react";
import Button from "../../components/Button";
import ButtonDelete from "../../components/ButtonDelete";
import { Formik, Form, Field } from "formik";

export default function Settings() {
  
  const user = {
    "_id": "648df661f48fb9b3213a831a",
    "name": "Stephan Ullmann",
    "userName": "Estephano",
    "avatar": "https://res.cloudinary.com/dokiz6udc/image/upload/v1687026490/SightSeeker/yzlqcvwsmukuv31pblio.webp",
    "email": "testmail@mailtest.test",
    "favorites": [],
    "friends": [
        {
            "user": {
                "avatar": "https://images-ext-1.discordapp.net/external/GyUam2pAgNjbvCzp42knkwvqumYzrPF86Rur6U88mbU/https/res.cloudinary.com/dokiz6udc/image/upload/v1686943211/default_avatar_yfsudh.jpg?width=583&height=583",
                "_id": "648dfbe07249a74782069d09",
                "userName": "friendlyTester"
              },
              "accepted": true,
              "received": false,
            "_id": "64900e5af86301db654f43dc"
        }
    ],
    "settings": {
        "darkMode": false,
        "preferences": [],
        "foundBy": "all",
        "locationServices": true,
        "showEmail": true,
        "showName": true
    },
    "chats": [],
    "travelPlans": []
  }
  
  const initialSetupValues = {
    password: "",
    darkMode: user.settings.darkMode,
    foundBy: user.settings.foundBy,
    locationServices: user.settings.locationServices,
    showEmail: user.settings.showEmail,
    showName: user.settings.showName,
  };

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkZjY2MWY0OGZiOWIzMjEzYTgzMWEiLCJpYXQiOjE2ODc0NDAyMTcsImV4cCI6MTY4NzUyNjYxN30.nk4EeXtUtRxGGrSPzHevmcuVqNGjXMYry95-ou7iP00"
  
  const handleFormSubmit = async (values) => {
    await saveChangedSettings(values)
  }

  const handleSubmitButtonClick = async (submitForm) => {
    await submitForm();
  };

  
  const saveChangedSettings = async (values) => {
    console.log(values)
    try {
      const response = await fetch("http://localhost:8080/user/settings", {
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
  console.log(user.settings.locationServices)
  return (
    <>
      <div className="container">
        <h1 className="title">Settings</h1>
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
            <div className="first_element">
              <span className="small-dark">name</span>
              <span>{user.name}</span>
              <span className="small-dark">user name</span>
              <span>{user.userName}</span>
              <span className="small-dark">email</span>
              <span>{user.email}</span>
              <span className="small-dark">password</span>
              <span>{user.password}</span>
            </div>
            <div className="second_element">
              <div className="avatar">
                <img src={user.avatar} />
              </div>
            <h2>Customise</h2>
              <h3>Darkmode</h3>
              <label class="toggle">
                  <Field type="checkbox" className="toggle_checkbox" name="darkMode"/>
                  <div class="toggle_switch"></div>
                </label>
            <h2>Privacy</h2>
            <div>
              <div>
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
            </div>
              <Button
                  txt="done"
                  onClick={handleSubmitButtonClick}
                >
              </Button>
              <ButtonDelete txt={"delete account"} func={null} />
            </div>
          </Form>
              )}
        </Formik>
      </div>
    </>
  );
}
