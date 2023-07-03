import * as React from "react";

export function useAddToHomescreenPrompt() {
  const [prompt, setPrompt] = React.useState(null);
  const [isAppInstalled, setIsAppInstalled] = React.useState(false);

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  React.useEffect(() => {
    const ready = (event) => {
      event.preventDefault();
      setPrompt(event);
    };

    const checkInstallationStatus = () => {
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
      ) {
        setIsAppInstalled(true);
      }
    };

    window.addEventListener("beforeinstallprompt", ready);
    checkInstallationStatus();

    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
    };
  }, []);

  return [prompt, promptToInstall, isAppInstalled];
}
