import "./RegisterPage.css";
import LogoHorizontal from "../../components/LogoHorizontal";
import LogoVertical from "../../components/LogoVertical";
import Button from "../../components/Button";

export default function RegisterPage() {
  return (
    <div className="registerpage__wrapper">
      <div className="registerpage__header">
        <div className="registerpage__header-img_container">
          <LogoHorizontal />
          {/* <LogoVertical /> */}
        </div>
      </div>
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
        <Button text={"Register"} />
        <div className="registerpage__footer-bottom">
          Already have an account?
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}
