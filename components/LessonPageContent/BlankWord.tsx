import React from "react";
import styles from "@styles/BlankWord.module.css";

interface Props {
    content: string;
    showWord: boolean;
    isCorrect: boolean;
  }
const BlankWord = ({ content, showWord, isCorrect}: Props) => {
  return (
    <div>
      {
        showWord && isCorrect && <div className={styles.showingWordCorrect}>{content}</div>
      }
      {
        showWord && !isCorrect && <div className={styles.showingWordIncorrect}>{content}</div>
      }
      {
        !showWord && <div className={styles.hidingWord}></div>
      }
    </div>
  );
};

export default BlankWord;
