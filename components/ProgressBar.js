const ProgressBar = (props) => {
  const { bgcolor, height, completed } = props;

  const containerStyles = {
    height: `${height}px`,
    width: "300px",
    backgroundColor: "gray",
    //backgroundColor: "white",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    //width: `${completed}%`,
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

/*
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
*/
