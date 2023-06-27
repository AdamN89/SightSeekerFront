import "./loginPage.css";
import "../../App.css";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginGraphic from "./LoginGraphic";
import Loader from "../../components/Loader/Loader";

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
        console.log("data from login fetch: ", data);

        
        const invitationsReceived = data.data.friends.some(
          (friend) => friend.received
        );
        if (invitationsReceived) navigate("/invitation");
        else navigate("/home");
      }
    };
    sendLogin();
  };

  return (
    <div className="login_page">
      {isLoading ? <Loader /> : null}
      <div className="first_element">
        <LoginGraphic />
      </div>
      <div className="second_element login_page_element">
        <div>
          <h1 className="title">Welcome Back</h1>
          <p>{error ? error : "Login to your account"}</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="login_page_form">
            <input
              type="text"
              name="loginOne"
              id="loginOne"
              placeholder="username or email"
              onChange={(e) => setLoginOne(e.target.value)}
              value={loginOne}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button txt="login" key="login-btn" func={null} />
            <div className="login_page_signup">
              <p>Don't have an account?</p>
              <Link to={"/register"}>Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
