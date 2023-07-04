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

      console.log("beforeinstallprompt event:", event);

      // Check the installation status after the beforeinstallprompt event fires
      const checkInstallationStatus = () => {
        console.log("Check installation status");

        if (
          window.matchMedia("(display-mode: standalone)").matches ||
          window.navigator.standalone === true
        ) {
          console.log("PWA is already installed");
          setIsAppInstalled(true);
        } else {
          console.log("PWA is not installed");
          setIsAppInstalled(false);
        }
      };

      checkInstallationStatus();
    };

    const appInstalled = () => {
      console.log("App installed");
      setIsAppInstalled(true);
    };

    console.log("IS IT INSTALLED", isAppInstalled);

    window.addEventListener("beforeinstallprompt", ready);
    window.addEventListener("appinstalled", appInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
      window.removeEventListener("appinstalled", appInstalled);
    };
  }, []);

  return [prompt, promptToInstall, isAppInstalled, setIsAppInstalled];
}
