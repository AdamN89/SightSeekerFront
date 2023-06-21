import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import { Link, NavLink } from "react-router-dom"
import { useState } from "react";
import "./FeaturesPage.css";

export default function FeaturesPage() {
 const [ activeSlide, setActiveSlide ] = useState(0)

 const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1));
    console.log("working")
  };

  console.log(activeSlide)

  return (
    <div className="featurespage__wrapper">
        <div className="featurespage__slides-container">
            <div 
            id="slide1"
            className={`featurespage__slide ${
            activeSlide === 0 ? 'active' : ''
          }`}>
                <ProgressBar />
                <h1>Plan your travel</h1>
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
                activeSlide === 1 ? 'active' : ''
              }`}
            >
                <ProgressBar />
                <h1>Share the adventure</h1>
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
                activeSlide === 2 ? 'active' : ''
              }`}
            >
            <ProgressBar />
                <h1>Bon Voyage!</h1>
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