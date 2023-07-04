import Button from "../../components/Button";
import FeaturesBonVoyageGraphic from "./FeaturesBonVoyageGraphic";
import FeaturesPlanGraphic from "./FeaturesPlanGraphic";
import FeaturesShareGraphic from "./FeaturesShareGrapfic";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeatureProgress() {
  const [plan, setPlan] = useState({});
  const [share, setShare] = useState({});
  const [voyage, setVoyage] = useState({});
  const [progress, setProgress] = useState(1);
  const navigate = useNavigate();

  const slideOne = () => {
    setPlan({ animation: "left 1s forwards" });
    setShare({ animation: "right 1s forwards" });
    setProgress(50);
  };

  const slideTwo = () => {
    setShare({ animation: "left 1s forwards" });
    setVoyage({ animation: "right 1s forwards" });
    setProgress(100);
  };

  return (
    <div className="test">
      <ProgressBar percent={progress}>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : ""}`}
            ></div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : ""}`}
            ></div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : ""}`}
            ></div>
          )}
        </Step>
      </ProgressBar>
      <div className="feature_grid">
        <div className="feature plan" style={plan}>
          <h1 className="title">Plan your Travel</h1>
          <FeaturesPlanGraphic />
          <p>
            Introducing our new travel planning tool! Now you can easily plan
            your next adventure with just a few clicks. Whether you're dreaming
            of a relaxing beach getaway, an exciting city exploration, or an
            adventurous trek through the mountains, our tool has got you
            covered.
          </p>
          <Button txt={"next"} func={slideOne} key="plan" />
          <span
            className="feature_link"
            onClick={() => navigate("/initialsetup")}
          >
            Skip to initial setup
          </span>
        </div>
        <div className="feature share" style={share}>
          <h1 className="title">Share adventure</h1>
          <FeaturesShareGraphic />
          <p>
            Sharing your travel plans with friends and family is as simple as
            sending them an invitation to join your SightSeeker group. They can
            then access the itinerary, contribute their ideas, and stay updated
            on the latest developments. This collaborative approach fosters
            excitement and ensures that everyone feels involved in the
            adventure.
          </p>
          <Button txt={"next"} func={slideTwo} key="plan" />
          <span
            className="feature_link"
            onClick={() => navigate("/initialsetup")}
          >
            Skip to initial setup
          </span>
        </div>
        <div className="feature voyage" style={voyage}>
          <h1 className="title">Bon voyage!</h1>
          <FeaturesBonVoyageGraphic />
          <p>
            Capture new memories and share experiences with others to inspire
            their own travel adventures. Remember, every journey is an
            opportunity growth and exploration. Start your next travel adventure
            with an open mind, a spirit of adventure, and a willingness to
            embrace the unknown.
          </p>
          <Button
            txt={"To initial setup"}
            func={() => navigate("/initialsetup")}
            key="plan"
          />
        </div>
      </div>
    </div>
  );
}
