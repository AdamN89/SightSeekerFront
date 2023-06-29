import { useEffect, useRef } from "react";

export default function UploadButton({ txt }) {
  const buttonRef = useRef(null);
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

  return (
    <button className="btn" ref={buttonRef}>
      <label for="uploadButton">{txt}</label>
    </button>
  );
}
