import { useState } from "react";
import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import BlankWord from "../LessonPageContent/BlankWord";
import MediaContainer from "@components/LessonPageContent/MediaContainer";
import LessonPageWrapper from "../LessonPageWrapper";
import { WordCorrect } from "@models/strapi-types";
import WordCorrectPair from "@components/WordCorrectPair";

import styles from "@styles/LessonPageTemplates/ListenAndSelectWord.module.css";
import { Grid } from "semantic-ui-react";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const ListenAndSelectWord: React.FC<Props> = ({ page, navSlugs }: Props) => {
  const [feedback, setFeedback] = useState<Feedback>(Feedback.Hide);

  const wordPairTrue: WordCorrect = { word: "sefur", isCorrect: false };
  const wordPairFalse: WordCorrect = { word: "heitir", isCorrect: true };

  const [blankWord, setBlankWord] = useState("");

  const handleCorrect = () => {
    setBlankWord("heitir");
    setFeedback(Feedback.Correct);
  };

  const handleIncorrect = () => {
    setBlankWord("sefur");
    setFeedback(Feedback.Incorrect);
  };

  if (!page.audio) {
    page.audio = {
      url: "https://res.cloudinary.com/austurbru/video/upload/v1628423150/Godan_Daginn_1a43193eb4.mp4",
      name: "",
      alternativeText: "",
      caption: "",
      hash: "",
      ext: "",
      mime: "",
      size: 1,
      previewUrl: "",
      provider: "",
      createdAt: "",
      updatedAt: "",
      id: "",
    };
  } else {
    page.audio.url = "https://res.cloudinary.com/austurbru/video/upload/v1628423150/Godan_Daginn_1a43193eb4.mp4";
  }

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
          <div>Hvað</div>
          <BlankWord
            content={blankWord}
            showWord={feedback !== Feedback.Hide}
            isCorrect={feedback === Feedback.Correct}
          ></BlankWord>
          <div className={styles.level}> þú?</div>
        </div>
        <div className={styles.wordButtons}>
        <Grid columns={3} stackable >
          <Grid.Row>
            <Grid.Column>
              <WordCorrectPair
                wordCorrect={wordPairTrue}
                canClick={feedback === Feedback.Hide}
                notifyCorrect={handleCorrect}
                notifyIncorrect={handleIncorrect}
              ></WordCorrectPair>
            </Grid.Column>
            <Grid.Column>
              <WordCorrectPair
                wordCorrect={wordPairFalse}
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
