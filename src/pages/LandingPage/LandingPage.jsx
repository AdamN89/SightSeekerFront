import Button from "../../components/Button";
import ButtonHallow from "../../components/ButtonHallow";
import LogoHorizontal from "../../components/LogoHorizontal";
import "./style.css";

export default function LandingPage() {
  return (
    <div className="landing_page">
      <img
        src="./assets/start-adventure-today-graphic.png"
        alt="Start Adventure Today"
      />
      <LogoHorizontal />
      <p>
        Best way to plan and share your adventure with your friends and family
      </p>
      <div className="btn_container">
        <Button txt={"Login"} />
        <ButtonHallow txt={"Sign Up"} />
      </div>
    </div>
  );
}
