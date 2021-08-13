import styles from "@styles/LessonPageContent/TextAndTranslation.module.css";

interface Props {
    shortText: string;
    translation: string;
  }
const TextAndTranslation = ({ shortText, translation }: Props) => {
  return (
    <>
        <div className={styles.shortText}>{shortText}</div>
        <div className={styles.translation}>{translation}</div>
      </>
  );
};

export default TextAndTranslation;
