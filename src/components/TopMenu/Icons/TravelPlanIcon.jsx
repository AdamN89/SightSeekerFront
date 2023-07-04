import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function TravelPlanIcon() {
  const { lightMode } = useContext(ThemeContext);
  return (
    <>
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52 40H40C37.8 40 36 38.2 36 36C36 33.8 37.8 32 40 32H52C52 32 64 18.625 64 12C64 5.375 58.625 0 52 0C45.375 0 40 5.375 40 12C40 15.1875 42.775 19.925 45.6625 24H40C33.3875 24 28 29.3875 28 36C28 42.6125 33.3875 48 40 48H52C54.2 48 56 49.8 56 52C56 54.2 54.2 56 52 56H23.1875C21.1875 59.1 18.9625 61.9625 17.275 64H52C58.6125 64 64 58.6125 64 52C64 45.3875 58.6125 40 52 40ZM52 8C54.2125 8 56 9.7875 56 12C56 14.2125 54.2125 16 52 16C49.7875 16 48 14.2125 48 12C48 9.7875 49.7875 8 52 8ZM12 32C5.375 32 0 37.375 0 44C0 50.625 12 64 12 64C12 64 24 50.625 24 44C24 37.375 18.625 32 12 32ZM12 48C9.7875 48 8 46.2125 8 44C8 41.7875 9.7875 40 12 40C14.2125 40 16 41.7875 16 44C16 46.2125 14.2125 48 12 48Z"
          fill="url(#paint0_linear_55_528)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_55_528"
            x1="7"
            y1="8"
            x2="49"
            y2="53"
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
