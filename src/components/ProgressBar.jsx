import { ProgressBar, Step } from "react-step-progress-bar";

export default function StepsBar() {
  return (
    <ProgressBar
      percent={75}
      filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
    >
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            width="30px"
            src="../assets/logo-icon.svg"
          />
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            width="30px"
            src="../assets/logo-icon.svg"
          />
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            width="30px"
            src="../assets/logo-icon.svg"
          />
        )}
      </Step>
    </ProgressBar>
  );
}
