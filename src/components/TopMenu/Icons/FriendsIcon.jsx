import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function FriendsIcon() {
  const { lightMode } = useContext(ThemeContext);
  return (
    <>
      <svg
        width="64"
        height="45"
        viewBox="0 0 64 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.6 19.2C13.13 19.2 16 16.33 16 12.8C16 9.27 13.13 6.4 9.6 6.4C6.07 6.4 3.2 9.27 3.2 12.8C3.2 16.33 6.07 19.2 9.6 19.2ZM54.4 19.2C57.93 19.2 60.8 16.33 60.8 12.8C60.8 9.27 57.93 6.4 54.4 6.4C50.87 6.4 48 9.27 48 12.8C48 16.33 50.87 19.2 54.4 19.2ZM57.6 22.4H51.2C49.44 22.4 47.85 23.11 46.69 24.26C50.72 26.47 53.58 30.46 54.2 35.2H60.8C62.57 35.2 64 33.77 64 32V28.8C64 25.27 61.13 22.4 57.6 22.4ZM32 22.4C38.19 22.4 43.2 17.39 43.2 11.2C43.2 5.01 38.19 0 32 0C25.81 0 20.8 5.01 20.8 11.2C20.8 17.39 25.81 22.4 32 22.4ZM39.68 25.6H38.85C36.77 26.6 34.46 27.2 32 27.2C29.54 27.2 27.24 26.6 25.15 25.6H24.32C17.96 25.6 12.8 30.76 12.8 37.12V40C12.8 42.65 14.95 44.8 17.6 44.8H46.4C49.05 44.8 51.2 42.65 51.2 40V37.12C51.2 30.76 46.04 25.6 39.68 25.6ZM17.31 24.26C16.15 23.11 14.56 22.4 12.8 22.4H6.4C2.87 22.4 0 25.27 0 28.8V32C0 33.77 1.43 35.2 3.2 35.2H9.79C10.42 30.46 13.28 26.47 17.31 24.26Z"
          fill="url(#paint0_linear_55_534)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_55_534"
            x1="7"
            y1="5.6"
            x2="33.9879"
            y2="46.9079"
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
