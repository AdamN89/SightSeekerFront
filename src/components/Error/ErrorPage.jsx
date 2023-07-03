import "./ErrorPage.css";
import Button from "../Button";
import LogoVertical from "../LogoVertical";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div class="error_page">
      <div class="error_page_logo">
        <LogoVertical />
      </div>
      <img
        src="./assets/404page.svg"
        alt="character with mobile seeing error message"
      />
      <div className="error_page_message">
        <h1 class="error">404</h1>
        <span>ERROR</span>
      </div>
      <span>
        Our aim is to help you explore beyond the map, but it appears that you
        may have ventured too far. Allow us to suggest some alternative options
        for you to consider.
      </span>
      <div className="error_page_choice">
        <Button txt={"back to exploring"} func={() => navigate("/")} />
        <Button txt={"snake game"} func={() => navigate("/snake")} />
      </div>
    </div>
  );
}
