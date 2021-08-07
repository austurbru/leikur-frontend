import { AiFillCloseCircle } from "react-icons/ai";
import styles from "@styles/Incorrect.module.css";

const style = { color: "var(--red)", width: "3rem", height: "3rem", marginRight: "15px" };

export default function Incorrect() {
  return (
    <div className={styles.inCorrect}>
    <span>
      <AiFillCloseCircle style={style} />
    </span>
    <h2 className={styles.inCorrectText}>Incorrect</h2>
    </div >
  );
}
