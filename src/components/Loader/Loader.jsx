import "./loader.css";
import LogoIcon from "./LogoIcon";
import Typewriter from "typewriter-effect";

export default function Loader() {
  return (
    <div className="loader">
      <LogoIcon />
      <div className="spinner"></div>
      <h1 className="loader_txt">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .changeDelay(75)
              .typeString("Data Loading ...")
              .pauseFor(1000)
              .deleteAll()
              .start();
          }}
        />
      </h1>
    </div>
  );
}
