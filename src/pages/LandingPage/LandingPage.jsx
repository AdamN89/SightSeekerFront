import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonHallow from "../../components/ButtonHallow";
import "./LandingPage.css";
import LogoVertical from "../../components/LogoVertical";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing_page">
      <div className="first_element">
        <img
          src="./assets/start-adventure-today-graphic.png"
          alt="Start Adventure Today"
        />
      </div>
      <div className="second_element">
        <LogoVertical />
        <p>
          Best way to plan and share your adventure with your friends and family
        </p>
        <div className="btn_container">
          <Button txt={"Login"} func={() => navigate("/login")} key="login" />
          <ButtonHallow
            txt={"Sign Up"}
            func={() => navigate("/register")}
            key="signup"
          />
        </div>
      </div>
    </div>
  );
}
