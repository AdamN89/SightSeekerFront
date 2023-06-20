import "./RegisterPage.css";
import LogoHorizontal from "../../components/LogoHorizontal";
import Button from "../../components/Button";
import { Link, NavLink, useNavigate } from "react-router-dom"

export default function RegisterPage() {

  const navigate = useNavigate()

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
            <input type="text" placeholder="name and last name" />
            <input type="text" placeholder="username" />
            <input type="text" placeholder="email" />
            <input type="text" placeholder="password" />
            <input type="text" placeholder="confirm password" />
            <p>
              By registering, you are agreeing to our Terms of Use and Privacy
              Policy
            </p>
          </div>
        </div>
        <div className="registerpage__footer">
          <Link to="/" >
          <Button txt={"Register"} />
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