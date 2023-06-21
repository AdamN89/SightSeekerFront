import Button from "../../components/Button";
import { Link, NavLink } from "react-router-dom"
import { useState } from "react";
import "./FeaturesPage.css";
import FeaturesPlanGraphic from "./FeaturesPlanGraphic";
import FeaturesShareGrapfic from "./FeaturesShareGrapfic"
import FeaturesBonVoyageGraphic from "./FeaturesBonVoyageGraphic"
import ProgressBar from "../../components/ProgressBar";
import CheckMark from "./CheckMark";

export default function FeaturesPage() {
 const [ activeSlide, setActiveSlide ] = useState(1)

 const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1));
  };

  return (
    <div className="featurespage__wrapper">
        <div className="featurespage__slides-container">
        <div className="step-progress">
      <div className="step-progress-bar">
      <div className="step-progress-line" style={{ "--active-slide": activeSlide }}></div>
        {/* <div className="step-progress-line" style={{ "--active-slide": activeSlide }}></div> */}
      </div>
      <div className="step-progress-step">
        <div className={`step-progress-step-item ${activeSlide === 1 ? 'active' : ''}`}><CheckMark /></div>
        <div className={`step-progress-step-item ${activeSlide === 2 ? 'active' : ''}`}><CheckMark /></div>
        <div className={`step-progress-step-item ${activeSlide === 3 ? 'active' : ''}`}><CheckMark /></div>
      </div>
    </div>
                    {/* <ProgressBar /> */}
            <div 
            id="slide1"
            className={`featurespage__slide ${
            activeSlide === 1 ? 'active' : ''
          }`}>
                <h1>Plan your travel</h1>
                <FeaturesPlanGraphic activeSlide={activeSlide} />
                <p>
                    Introducing our new travel planning tool!
                    Now you can easily plan your next adventure with just a few clicks.
                    Whether you're dreaming of a relaxing beach getaway, an exciting city exploration,
                    or an adventurous trek through the mountains, our tool has got you covered.
                </p>
                    <Button txt={"NEXT"} func={handleNextSlide} />
                <NavLink to="/initialsetup">Skip to initial setup</NavLink>
            </div>
            <div 
            id="slide2"
            className={`featurespage__slide ${
                activeSlide === 2 ? 'active' : ''
              }`}
            >
                {/* <StepsBar /> */}
                <h1>Share the adventure</h1>
                <FeaturesShareGrapfic />
                <p>
                Sharing your travel plans with friends and family is as simple as sending them an invitation to join your SightSeeker group.
                They can then access the itinerary, contribute their ideas, and stay updated on the latest developments.
                This collaborative approach fosters excitement and ensures that everyone feels involved in the adventure.
                </p>
                <Button txt={"NEXT"} func={handleNextSlide} />
                <NavLink to="/initialsetup">Skip to initial setup</NavLink>
            </div>
            <div 
            id="slide3"
            className={`featurespage__slide ${
                activeSlide === 3 ? 'active' : ''
              }`}
            >
            {/* <StepsBar /> */}
                <h1>Bon Voyage!</h1>
                <FeaturesBonVoyageGraphic />
                <p>
                    Capture new memories and share experiences with others to inspire their own travel adventures.
                    Remember, every journey is an opportunity growth and exploration.
                    Start your next travel adventure with an open mind, a spirit of adventure, and a willingness to embrace the unknown. 
                </p>
                <Link to="/initialsetup">
                    <Button txt={"TO INITIAL SETUP"} />
                </Link>
            </div>
        </div>
    </div>
  )
};