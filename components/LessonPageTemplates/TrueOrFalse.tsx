import { useState } from "react";
import { PagesEntity } from "@models/strapi-types";
import { Feedback } from "@models/enums";
import NavSlugs from "@models/nav-slugs";
import MediaContainer from "@components/LessonPageContent/MediaContainer";
import TextAndTranslation from "@components/LessonPageContent/TextAndTranslation";
import LessonPageWrapper from "@components/LessonPageWrapper";
import TrueButton from "@components/LessonPageContent/TrueButton";
import FalseButton from "@components/LessonPageContent/FalseButton";
import styles from "@styles/LessonPageTemplates/TrueOrFalse.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
  key: string;
}

const TrueOrFalse = ({ page, navSlugs, key }: Props) => {
  if (key !== page.pageInfo.slug && key !== undefined) {
    console.error("The pageKey is not the page slug");
  }

  const [feedback, setFeedback] = useState<Feedback>(Feedback.Hide);

  const handleCorrect = () => {
    setFeedback(Feedback.Correct);
  };

  const handleIncorrect = () => {
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
        <TextAndTranslation shortText={page.statement!} translation={page.explanation!} />
        <div className={styles.trueAndFalse}>
          <TrueButton
            isCorrect={page.isTrue!}
            canClick={feedback === Feedback.Hide}
            notifyCorrect={handleCorrect}
            notifyIncorrect={handleIncorrect}
          />
          <FalseButton
            isCorrect={!page.isTrue!}
            canClick={feedback === Feedback.Hide}
            notifyCorrect={handleCorrect}
            notifyIncorrect={handleIncorrect}
          />
        </div>
      </div>
    </LessonPageWrapper>
  );
};

export default TrueOrFalse;
