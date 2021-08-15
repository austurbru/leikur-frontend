import useTranslation from "next-translate/useTranslation";
import { FaCheckCircle } from "react-icons/fa";
import styles from "@styles/Correct.module.css";

const style = { color: "var(--green)", width: "3rem", height: "3rem", marginRight: "15px" };

export default function Correct() {
  let { t } = useTranslation();
  return (
    <div className={styles.correct}>
    <span>
      <FaCheckCircle style={style} />
    </span>
    <h2 className={styles.correctText}>{t("common:correct")}</h2>
    </div >
  );
}

