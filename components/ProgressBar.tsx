import { CSSProperties } from "react";

const ProgressBar = (props: { height: number }) => {
  const { height } = props;

  const containerStyles = {
    height: `${height}px`,

    backgroundColor: "gray",
    borderRadius: 50,
  };

  const fillerStyles: CSSProperties = {
    height: "100%",
    width: "100px",
    backgroundColor: "blue",
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
