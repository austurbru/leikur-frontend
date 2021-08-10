const ProgressBar = (props) => {
  const { bgcolor, height, completed } = props;

  const containerStyles = {
    height: `${height}px`,
    width: "100%",
    backgroundColor: "var(--progressBar-bg)",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "var(--primary-app-color)",
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;

/*
  const fillerStyles = {
    height: "100%",
    width: `${() => {
      if (completed > 100) {
        return 100;
      } else if (completed < 0) {
        return 0;
      } else {
        return completed;
      }
    }}%`,
*/

/*
    width: `${() => {
      if (completed >= 0 && completed <= 100) {
        return completed;
      }
      if (completed > 100) {
        return 100;
      }
      if (completed < 0) {
        return 0;
      }
    }}%`,
*/
