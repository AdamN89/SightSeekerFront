import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function FavouritesIcon() {
  const { lightMode } = useContext(ThemeContext);
  return (
    <>
      <svg
        width="64"
        height="62"
        viewBox="0 0 64 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.5667 2.13086L20.7552 17.9693L3.27781 20.5174C0.143608 20.9719 -1.11246 24.8359 1.16043 27.049L13.8049 39.3704L10.8142 56.776C10.2759 59.9222 13.5896 62.2788 16.3649 60.8074L32 52.5891L47.6351 60.8074C50.4104 62.2668 53.7241 59.9222 53.1858 56.776L50.1951 39.3704L62.8396 27.049C65.1125 24.8359 63.8564 20.9719 60.7222 20.5174L43.2448 17.9693L35.4333 2.13086C34.0336 -0.692314 29.9783 -0.728202 28.5667 2.13086Z"
          fill="url(#paint0_linear_55_524)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_55_524"
            x1="7"
            y1="7.65701"
            x2="47.0399"
            y2="52.4786"
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
