import { useRef } from "react";
import { useAddToHomescreenPrompt } from "./useAddToHomeScreenPrompt";
import LogoHorizontal from "./LogoHorizontal";

export default function ButtonInstall() {
  const buttonRef = useRef(null);
  const [prompt, promptToInstall, isAppInstalled] = useAddToHomescreenPrompt();

  // console.log("isAppInstalled:", isAppInstalled);

  function mouseMoveEvent(e) {
    const { x, y } = buttonRef.current.getBoundingClientRect();
    buttonRef.current.style.setProperty("--x", e.clientX - x);
    buttonRef.current.style.setProperty("--y", e.clientY - y);
  }

  const handleInstallClick = () => {
    promptToInstall()
      .then(() => {
        // Installation prompt shown
      })
      .catch((error) => {
        console.error("Failed to prompt installation:", error);
      });
  };

  return (
    <>
      {isAppInstalled ? (
        <LogoHorizontal />
      ) : (
        <button
          onClick={handleInstallClick}
          className="install_btn"
          ref={buttonRef}
        >
          <span>Install SightSeeker</span>
        </button>
      )}
    </>
  );
}
