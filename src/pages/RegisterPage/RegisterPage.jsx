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
  const { login, setUser, backendURL } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [valuesToSubmit, setValuesToSubmit] = useState();

  const register = async () => {
    setIsLoading(true);
    console.log(1);
    try {
      const response = await fetch(
        "https://sightseeker-backend.onrender.com/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valuesToSubmit),
        }
      );
      console.log(2);
      if (response.ok) {
        console.log("3-ok");
        setIsLoading(false);
        const registeredUser = await response.json();
        localStorage.setItem("token", registeredUser.token);
        login(registeredUser.token);
        setUser(registeredUser.data);
        navigate("/features");
      }
      // else {
      //   console.log("Error occurred while registering");
      // }
    } catch (error) {
      console.log("3-not_ok");
      setIsLoading(false);
      console.error("Error occurred while registering", error);
    }
  };

  const handleFormSubmit = async (values) => {
    setValuesToSubmit(values);
    console.log("inside handleFormSubmit");
  };

  const handleSubmitButtonClick = async (submitForm) => {
    await submitForm();
    await register();
    console.log("inside handleSubmitButtonClick");
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
              isSubmitting,
              submitForm,
              /* and other goodies */
            }) => (
              <Form>
                <div className="register_page_form">
                  <Field
                    type="text"
                    placeholder="full name"
                    name="name"
                    className={errors.name && touched.name ? "input-error" : ""}
                  />
                  {errors.name && touched.name && (
                    <p className="error-message">{errors.name}</p>
                  )}
                  <Field
                    type="text"
                    placeholder="username"
                    name="userName"
                    className={
                      errors.userName && touched.userName ? "input-error" : ""
                    }
                  />
                  {errors.userName && touched.userName && (
                    <p className="error-message">{errors.userName}</p>
                  )}
                  <Field
                    type="text"
                    placeholder="email"
                    name="email"
                    className={
                      errors.email && touched.email ? "input-error" : ""
                    }
                  />
                  {errors.email && touched.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                  <Field
                    type="password"
                    placeholder="password"
                    name="password"
                    className={
                      errors.password && touched.password ? "input-error" : ""
                    }
                  />
                  {errors.password && touched.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                  <Field
                    type="password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                  )}
                  <span>
                    By registering, you are agreeing to our Terms of Use and
                    Privacy Policy
                  </span>
                </div>

                <div>
                  <Button
                    txt={"Register"}
                    func={() => {
                      handleSubmitButtonClick(submitForm);

                      // if (errors.confirmPassword) {
                      //   alert(errors.confirmPassword);
                      // }
                      // if (errors.email) {
                      //   alert(errors.email);
                      // }
                      // if (errors.name) {
                      //   alert(errors.name);
                      // }
                      // if (errors.userName) {
                      //   alert(errors.userName);
                      // }
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
