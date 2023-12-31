import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function AboutIcon() {
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
          d="M32 0C14.3281 0 0 14.3333 0 32C0 49.677 14.3281 64 32 64C49.6719 64 64 49.677 64 32C64 14.3333 49.6719 0 32 0ZM32 14.1935C34.993 14.1935 37.4194 16.6199 37.4194 19.6129C37.4194 22.6059 34.993 25.0323 32 25.0323C29.007 25.0323 26.5806 22.6059 26.5806 19.6129C26.5806 16.6199 29.007 14.1935 32 14.1935ZM39.2258 46.9677C39.2258 47.8228 38.5325 48.5161 37.6774 48.5161H26.3226C25.4675 48.5161 24.7742 47.8228 24.7742 46.9677V43.871C24.7742 43.0159 25.4675 42.3226 26.3226 42.3226H27.871V34.0645H26.3226C25.4675 34.0645 24.7742 33.3712 24.7742 32.5161V29.4194C24.7742 28.5643 25.4675 27.871 26.3226 27.871H34.5806C35.4357 27.871 36.129 28.5643 36.129 29.4194V42.3226H37.6774C38.5325 42.3226 39.2258 43.0159 39.2258 43.871V46.9677Z"
          fill="url(#paint0_linear_55_542)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_55_542"
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
