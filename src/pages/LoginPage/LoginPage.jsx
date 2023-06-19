import "./loginPage.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page__image login-page_placeholder">
        <img
          className="login-page_img"
          src=""
          alt="A man about to go on a journey, wearing a backpack, dragging a wheeled suitcase."
        />
      </div>
      <hgroup className="login-page__hgroup">
        <h1 className="login-page__heading">Welcome Back</h1>
        <p className="login-page__subtitle">Login to your account</p>
      </hgroup>
      <form className="login-page__form">
        <input
          className="login-page__input"
          type="text"
          name="loginOne"
          id="loginOne"
          placeholder="username or email"
        />
        <input
          className="login-page__input"
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <Button txt="login" />
      </form>
      <div className="login-page__signup-wrapper">
        <p className="login-page__signup-text">Don't have an account?</p>
        <Link className="login-page__signup-link">Sign Up</Link>
      </div>
    </div>
  );
}
