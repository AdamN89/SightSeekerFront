import "./RegisterPage.css";
import LogoHorizontal from "../../components/LogoHorizontal";
import Button from "../../components/Button";
import { Link, NavLink } from "react-router-dom"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  userName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required"),
})

const initialRegisterValues = {
  name: "",
  userName: "",
  email: "",
  password: ""
}

export default function RegisterPage() {

  const register = async (values, onSubmitProps) => {

    if (values.password !== values.confirmPassword) {
      return null
    }

    const signupUser = await fetch('http://localhost:8080/user/signup',{
      method: "POST",
      body: {
        name: values.name,
        userName: values.userName,
        email: values.email,
        password: values.password
      },
    })
    const registeredUser = await signupUser.json()
    onSubmitProps.resetForm()

    if (registeredUser) {
      console.log("registered user", registeredUser)
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps)
    console.log("this is handleFormSubmit + values + onSubmitProps", values, onSubmitProps)
  }

  return (
    <div className="registerpage__wrapper">
      <div className="registerpage__header">
        <div className="registerpage__header-img_container">
          <LogoHorizontal />
        </div>
      </div>
      <div className="registerpage__body-wrapper">
        <div className="registerpage__body">
          <div className="registerpage__body-top">
            <h1>Register</h1>
            Create your account
          </div>
          <div className="registerpage__body-middle">
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
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="full name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                  />
            <input
              type="text"
              placeholder="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userName}
              name="userName"
            />
            <input
              type="text"
              placeholder="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
            />
            <input
              type="text"
              placeholder="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
            />
            <input
              type="text"
              placeholder="confirm password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              name="confirmPassword"
            />
                {errors.password && touched.password && errors.password}
                </form>
            )}
            
            </Formik>
            <p>
              By registering, you are agreeing to our Terms of Use and Privacy
              Policy
            </p>
          </div>
        </div>
        <div className="registerpage__footer">
          <Link to="/register" >
          <Button txt={"Register"} func={handleFormSubmit} />
          </Link>
          <div className="registerpage__footer-bottom">
            <p>Already have an account?</p>
            <NavLink>Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}