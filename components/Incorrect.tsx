import { AiFillCloseCircle } from "react-icons/ai";
import useTranslation from "next-translate/useTranslation";
import styles from "@styles/Incorrect.module.css";

const style = { color: "var(--red)", width: "3rem", height: "3rem", marginRight: "15px" };

const Incorrect = () => {
  let { t } = useTranslation();
  return (
    <div className={styles.inCorrect}>
      <span>
        <AiFillCloseCircle style={style} />
      </span>
      <h2 className={styles.inCorrectText}>{t("common:inCorrect")}</h2>
    </div>
  );
};

export default Incorrect;
