import { useState } from "react";
import { useEffect, useRef } from "react";
import { useAddToHomescreenPrompt } from "./useAddToHomeScreenPrompt";

export default function ButtonInstall() {
  const buttonRef = useRef(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  // throw your mousemove callback up here to "add" and "remove" later
  // might be worth a useCallback based on the containerRef as well!
  function mouseMoveEvent(e) {
    const { x, y } = buttonRef.current.getBoundingClientRect();
    buttonRef.current.style.setProperty("--x", e.clientX - x);
    buttonRef.current.style.setProperty("--y", e.clientY - y);
  }

  useEffect(() => {
    if (buttonRef) {
      buttonRef.current.addEventListener("mousemove", mouseMoveEvent);
    }
    // don't forget to *remove* the eventListener
    // when your component unmounts!
    // return () =>
    //   buttonRef.current.removeEventListener("mousemove", mouseMoveEvent);
  }, [buttonRef]);

  // useeffect and function for install button
  useEffect(() => {
    console.log("event handler running");
    const handleBeforeInstallPrompt = (event) => {
      // if app can be installed, assign the event to deferred prompt variable
      event.preventDefault();
      console.log(`inside of useeffect mount ${event}`);
      setDeferredPrompt(event);
    };
    // Add event listener for before install prompt event
    window.addEventListener("beforeinstallprompt", (event) => {
      handleBeforeInstallPrompt(event);
      console.log(`inside add listner: ${event}`);
    });

    //Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // function for handeling of install button
  const handleInstallBtn = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      console.log(
        "Deferred prompt is null. SightSeeker App could not be installed."
      );
    }
  };

  return (
    <button onClick={promptToInstall} className="install_btn" ref={buttonRef}>
      <span>Install SightSeeker</span>
    </button>
  );
}
