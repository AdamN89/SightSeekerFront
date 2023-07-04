import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function SettingsIcon() {
  const { lightMode } = useContext(ThemeContext);
  return (
    <>
      <svg
        width="64"
        height="56"
        viewBox="0 0 64 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M62 44H20V42C20 40.9 19.1 40 18 40H14C12.9 40 12 40.9 12 42V44H2C0.9 44 0 44.9 0 46V50C0 51.1 0.9 52 2 52H12V54C12 55.1 12.9 56 14 56H18C19.1 56 20 55.1 20 54V52H62C63.1 52 64 51.1 64 50V46C64 44.9 63.1 44 62 44ZM62 24H52V22C52 20.9 51.1 20 50 20H46C44.9 20 44 20.9 44 22V24H2C0.9 24 0 24.9 0 26V30C0 31.1 0.9 32 2 32H44V34C44 35.1 44.9 36 46 36H50C51.1 36 52 35.1 52 34V32H62C63.1 32 64 31.1 64 30V26C64 24.9 63.1 24 62 24ZM62 4H36V2C36 0.9 35.1 0 34 0H30C28.9 0 28 0.9 28 2V4H2C0.9 4 0 4.9 0 6V10C0 11.1 0.9 12 2 12H28V14C28 15.1 28.9 16 30 16H34C35.1 16 36 15.1 36 14V12H62C63.1 12 64 11.1 64 10V6C64 4.9 63.1 4 62 4Z"
          fill="url(#paint0_linear_55_538)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_55_538"
            x1="7"
            y1="7"
            x2="43.0947"
            y2="51.1976"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={lightMode ? "#662D91" : "#8a4abe"} />
            <stop offset="1" stopColor={lightMode ? "#92278F" : "#b775b5"} />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
