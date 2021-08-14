import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import BlankWord from "@components/LessonPageContent/BlankWord";
import MediaContainer from "@components/LessonPageContent/MediaContainer";
import LessonPageWrapper from "@components/LessonPageWrapper";
import WordCorrectPair from "@components/WordCorrectPair";

import styles from "@styles/LessonPageTemplates/ListenAndSelectWord.module.css";


interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const ListenAndSelectWord: React.FC<Props> = ({ page, navSlugs }: Props) => {
  const [feedback, setFeedback] = useState<Feedback>(Feedback.Hide);

  const words = page.words
  const wordPairOne = words![0];
  const wordPairTwo = words![1];

  const sentencePartOne = page.sentence?.split("[")[0];
  const sentencePartTwo = page.sentence?.split("]")[1];

  const [blankWord, setBlankWord] = useState("");

  const handleCorrect = () => {

    //We have 2 words, one correct and the other incorrect.

    let correctWord = "";
    if (wordPairOne.isCorrect) {
      correctWord = wordPairOne.word;
    }
    if (wordPairTwo.isCorrect) {
      correctWord = wordPairTwo.word;
    }

    setBlankWord(correctWord);
    setFeedback(Feedback.Correct);
  };

  const handleIncorrect = () => {

    let inCorrectWord = "";
    if (wordPairOne.isCorrect === false) {
      inCorrectWord = wordPairOne.word;
    }
    if (wordPairTwo.isCorrect === false) {
      inCorrectWord = wordPairTwo.word;
    }

    setBlankWord(inCorrectWord);
    setFeedback(Feedback.Incorrect);
  };

  return (
    <LessonPageWrapper
      page={page}
      navSlugs={navSlugs}
      canContinue={true}
      feedback={feedback}
      notifyCannotContinue={() => {}}
    >
      <div className={styles.mainContent}>
        <MediaContainer page={page} />
        <div className={styles.displayFlex}>
          <div>{sentencePartOne}</div>
          <BlankWord
            content={blankWord}
            showWord={feedback !== Feedback.Hide}
            isCorrect={feedback === Feedback.Correct}
          ></BlankWord>
          <div>{sentencePartTwo}</div>
        </div>
        <div className={styles.wordButtons}>
        <Grid columns={3} stackable >
          <Grid.Row>
            <Grid.Column>
              <WordCorrectPair
                wordCorrect={wordPairOne}
                canClick={feedback === Feedback.Hide}
                notifyCorrect={handleCorrect}
                notifyIncorrect={handleIncorrect}
              ></WordCorrectPair>
            </Grid.Column>
            <Grid.Column>
              <WordCorrectPair
                wordCorrect={wordPairTwo}
                canClick={feedback === Feedback.Hide}
                notifyCorrect={handleCorrect}
                notifyIncorrect={handleIncorrect}
              ></WordCorrectPair>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
      </div>
    </LessonPageWrapper>
  );
};

export default ListenAndSelectWord;
