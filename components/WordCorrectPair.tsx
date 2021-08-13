import { useState } from "react";
import styles from "@styles/WordCorrectPair.module.css";

import { WordCorrect } from "@models/strapi-types";


interface Props {
  wordCorrect: WordCorrect;
  canClick: boolean;
  notifyCorrect: () => void;
  notifyIncorrect: () => void;
}

function WordCorrectPair({ wordCorrect, canClick, notifyCorrect, notifyIncorrect }: Props) {

  const [showWord, setShowWord] = useState(true);

  const handleClick = () => {

    console.log(canClick)
    if(canClick === false){
      return;
    }

    setShowWord(false);

    if (wordCorrect.isCorrect) {
      notifyCorrect();
    } else {
      notifyIncorrect();
    }
  };

  //return the buttons for true or false
  return (
   
    <div className={styles.wordButton} onClick={() => handleClick()}>
    { showWord && wordCorrect.word}
  </div>
/*     <div className={styles.trueOrFalseButtons}>

    </div> */
    
  );
}

export default WordCorrectPair;
