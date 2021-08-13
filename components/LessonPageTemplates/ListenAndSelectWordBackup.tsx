import { useState } from "react";
import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import BlankWord from "../LessonPageContent/BlankWord";
import MediaContainer from "@components/LessonPageContent/MediaContainer";
import LessonPageWrapper from "../LessonPageWrapper";
import { WordCorrect } from "@models/strapi-types";
import WordCorrectPair from "@components/WordCorrectPair";
import TextAndTranslation from "../LessonPageContent/TextAndTranslation";
import TrueButton from "../LessonPageContent/TrueButton";
import FalseButton from "../LessonPageContent/FalseButton";

import styles from "@styles/BasicPageTemplate.module.css";

import AudioExample from "@components/LessonPageContent/AudioExample";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const ListenAndSelectWordBackup: React.FC<Props> = ({ page, navSlugs }: Props) => {
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
          <h3>Hvað</h3>
          <BlankWord
            content={blankWord}
            showWord={feedback !== Feedback.Hide}
            isCorrect={feedback === Feedback.Correct}
          ></BlankWord>
          <h3 className={styles.level}> þú?</h3>
        </div>
        <WordCorrectPair
          wordCorrect={wordPairTrue}
          canClick={feedback === Feedback.Hide}
          notifyCorrect={handleCorrect}
          notifyIncorrect={handleIncorrect}
        ></WordCorrectPair>
        <WordCorrectPair
          wordCorrect={wordPairFalse}
          canClick={feedback === Feedback.Hide}
          notifyCorrect={handleCorrect}
          notifyIncorrect={handleIncorrect}
        ></WordCorrectPair>
        {page.audioExample !== undefined && (
          <div>
            <br />
            <hr />
            <AudioExample audioSrcUrl={page.audioExample?.audio.url} />

            <TextAndTranslation shortText={page.audioExample!.text} translation={page.audioExample!.translation} />
          
          <div className={styles.trueAndFalse}>
            <TrueButton isCorrect={true}
            canClick={feedback === Feedback.Hide}
            notifyCorrect={handleCorrect}
            notifyIncorrect={handleIncorrect} />
            <FalseButton isCorrect={false}
            canClick={feedback === Feedback.Hide}
            notifyCorrect={handleCorrect}
            notifyIncorrect={handleIncorrect} />
          </div>
          </div>
        )}
      </div>
    </LessonPageWrapper>
  );
};

export default ListenAndSelectWordBackup;
