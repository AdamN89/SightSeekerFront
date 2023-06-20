import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import { NavLink } from "react-router-dom"

export default function FeaturesPage() {
  return (
    <div className="featurespage__wrapper">
        <div className="featurespage__slide1">
            <ProgressBar />
            <h1>Plan your travel</h1>
            <p>
                Introducing our new travel planning tool!
                Now you can easily plan your next adventure with just a few clicks.
                Whether you're dreaming of a relaxing beach getaway, an exciting city exploration,
                or an adventurous trek through the mountains, our tool has got you covered.
            </p>
            <Button txt={"NEXT"} />
            <NavLink to="/initialsetup">Skip to initial setup</NavLink>
        </div>
        <div className="featurespage__slide2">

        </div>
        <div className="featurespage__slide3">

        </div>
    </div>
  )
};

