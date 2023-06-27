import "./RegisterPage.css";
import LogoVertical from "../../components/LogoVertical";
import Button from "../../components/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const registerSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const initialRegisterValues = {
  name: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const {login, setUser} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const register = async (values) => {
    setIsLoading(true)
    console.log(1)
    try {
      const response = await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(2)
      if (response.ok) {
        console.log("3-ok")
        setIsLoading(false);
        const registeredUser = await response.json();
        localStorage.setItem("token", registeredUser.token);
        login(registeredUser.token);
        setUser(registeredUser.data);
        navigate("/initialsetup")
      }
      // else {
      //   console.log("Error occurred while registering");
      // }
    } catch (error) {
      console.log("3-not_ok")
      setIsLoading(false);
      console.error("Error occurred while registering", error);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    await register(values);
    setSubmitting(false);
  };

  const handleSubmitButtonClick = async (submitForm) => {
    await submitForm();
  };

  return (
    <div className="register_page">
      <div className="first_element">
        <LogoVertical />
      </div>
      <div className="second_element">
        <div>
          <h1 className="title">Register</h1>
          <p>Create your account</p>
        </div>
        <div>
          <Formik
            initialValues={initialRegisterValues}
            validationSchema={registerSchema}
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
                <div className="register_page_form">
                  <Field type="text" placeholder="full name" name="name" />
                  <Field type="text" placeholder="username" name="userName" />
                  <Field type="text" placeholder="email" name="email" />
                  <Field
                    type="password"
                    placeholder="password"
                    name="password"
                  />
                  <Field
                    type="password"
                    placeholder="confirm password"
                    name="confirmPassword"
                  />
                  <span>
                    By registering, you are agreeing to our Terms of Use and
                    Privacy Policy
                  </span>
                </div>

                <div>
                    <Button
                      txt={"Register"}
                      func={() => {
                          handleSubmitButtonClick(submitForm)
                        
                          if(errors.confirmPassword)
                          {alert(errors.confirmPassword)}
                          if(errors.email)
                          {alert(errors.email)}
                          if(errors.name)
                          {alert(errors.name)}
                          if (errors.userName)
                          {alert(errors.userName)}
                        }}
                    />
                  <div className="register_page_login">
                    <p>Already have an account?</p>
                    <Link to="/login">Login</Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
