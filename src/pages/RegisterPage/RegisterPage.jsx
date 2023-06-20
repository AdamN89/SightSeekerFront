import "./RegisterPage.css";
import LogoHorizontal from "../../components/LogoHorizontal";
import Button from "../../components/Button";
import { Link, NavLink } from "react-router-dom"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"

const registerSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  userName: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialRegisterValues = {
  name: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

export default function RegisterPage() {

  const register = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const registeredUser = await response.json();
      } else {
        console.log('Error occurred while registering');
      }
    } catch (error) {
      console.error('Error occurred while registering', error);
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
              submitForm
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  type="text"
                  placeholder="full name"
                  name="name"
                />
                <Field
                  type="text"
                  placeholder="username"
                  name="userName"
                />
                <Field
                  type="text"
                  placeholder="email"
                  name="email"
                />
                <Field
                  type="text"
                  placeholder="password"
                  name="password"
                />
                <Field
                  type="text"
                  placeholder="confirm password"
                  name="confirmPassword"
                />

                <div className="registerpage__footer">
                <p>
                  By registering, you are agreeing to our Terms of Use and Privacy
                  Policy
                </p>
                  <Link to="/initialsetup" >
                    <Button txt={"Register"} func={() => handleSubmitButtonClick(submitForm)} />
                  </Link>
                  <div className="registerpage__footer-bottom">
                    <p>Already have an account?</p>
                    <NavLink to="/login">Login</NavLink>
                  </div>
                </div>
                </Form>
            )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}