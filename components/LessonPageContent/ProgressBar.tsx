import { CSSProperties } from "react";

const ProgressBar = (props: { height: number; completed: number }) => {
  const { height, completed } = props;

  const containerStyles = {
    height: `${height}px`,
    width: "100%",
    backgroundColor: "var(--progressBar-bg)",
    borderRadius: 50,
  };

  const fillerStyles: CSSProperties = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "var(--primary-app-color)",
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  return (
    <>
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    </>
  );
};

export default ProgressBar;
