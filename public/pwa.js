// let deferredPrompt = null;

// window.addEventListener("beforeinstallprompt", (e) => {
//   //if app can be installed, assign the event to deferred prompt variable
//   deferredPrompt = e;
// });

// window.addEventListener("load", () => {
//   //select the button with ID install_btn
//   const pwaAppInstallBtn = document.getElementById("installButton");
//   pwaAppInstallBtn.addEventListener("click", async () => {
//     if (deferredPrompt !== null) {
//       deferredPrompt.prompt();
//       const { outcome } = await deferredPrompt.userChoice;
//       if (outcome === "accepted") {
//         deferredPrompt = null;
//       }
//     } else {
//       console.log(
//         "deferred prompt is null SightSeeker App could not be installed"
//       );
//     }
//   });
// });
