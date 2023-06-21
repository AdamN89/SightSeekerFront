import { useState } from "react";
import CheckMark from "../pages/FeaturesPage/CheckMark"

export default function ProgressBar() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleButtonClick = () => {
    setActiveSlide(prevSlide => prevSlide + 1);
  };

  return (
    <div className="step-progress">
      <div className="step-progress-bar">
        <div className="step-progress-line" style={{ width: `${(activeSlide / 2) * 100}%`, "--active-slide": activeSlide }}></div>
      </div>
      <div className="step-progress-step">
        <div className={`step-progress-step-item ${activeSlide === 0 ? 'active' : ''}`}><CheckMark /></div>
        <div className={`step-progress-step-item ${activeSlide === 1 ? 'active' : ''}`}><CheckMark /></div>
        <div className={`step-progress-step-item ${activeSlide === 2 ? 'active' : ''}`}><CheckMark /></div>
      </div>
    </div>
  );
}

