import "./loginPage.css";
import "../../App.css";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const { login, setUser } = useContext(AuthContext);

  const [loginOne, setLoginOne] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const sendLogin = async () => {
      // POST http://localhost:8080/user/login   -> JSON with userName/email and password
      const res = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ loginOne, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setError(data.error);
        console.error(data.error);
      }
      if (res.ok) {
        setLoginOne("");
        setPassword("");
        localStorage.setItem("token", data.token);
        login(data.token);
        setUser(data.data);
        setIsLoading(false);
        // console.log("data from login fetch: ", data);
        // navigate("/home");
      }
    };

    sendLogin();
  };

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
        <p className="login-page__subtitle">
          {error ? error : "Login to your account"}
        </p>
      </hgroup>
      <form className="login-page__form" onSubmit={handleLogin}>
        <input
          className="login-page__input"
          type="text"
          name="loginOne"
          id="loginOne"
          placeholder="username or email"
          onChange={(e) => setLoginOne(e.target.value)}
          value={loginOne}
        />
        <input
          className="login-page__input"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button txt="login" key="login-btn" func={null} />
      </form>
      <div className="login-page__signup-wrapper">
        <p className="login-page__signup-text">Don't have an account?</p>
        <Link className="login-page__signup-link" to={"/register"}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
