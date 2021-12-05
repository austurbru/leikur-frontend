import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@styles/RouteButton.module.css";

interface Props {
  color: string;
  content: string;
  destination: string;
}

const RouteButton = ({ color, content, destination }: Props) => {
  const router = useRouter();

  // Temporary function to be able to configure styling
  // without redirecting to the destination.
  const toggleLoading = () => {
    setIsLoading(!isLoading);

    if (false) {
      gotoDestination();
    }
  };

  const gotoDestination = () => {
    setIsLoading(true);
    router.push(destination);
  };

  const [isLoading, setIsLoading] = useState(false);

  const itemColor = `var(--${color.toLowerCase()})`;
  return (
    <>
      <div
        style={{ borderColor: itemColor }}
        onClick={toggleLoading}
        className={`
          ${styles.container}
          ${isLoading ? styles.isLoading : ""}
        `}
      >
        <div className={styles.iconAndText}>
          <i
            style={{ color: itemColor, fontSize: "x-large", marginRight: "5px" }}
            className={"angle double right icon"}
          ></i>
          {isLoading ? <h3 className={styles.noMargin}>Loading...</h3> : <h3 className={styles.noMargin}>{content}</h3>}
        </div>
      </div>
    </>
  );
};

export default RouteButton;
