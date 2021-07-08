import Link from "next/link";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import Correct from "@components/Correct";
import Incorrect from "@components/Incorrect";

import React, { useState } from "react";
import styles from "@styles/LessonNavigation.module.css";

interface Props {
  navSlugs: NavSlugs;
  feedback: Feedback;
  notifyContinue: () => void;
}

const LessonNavigation: React.FC<Props> = ({ navSlugs, feedback, notifyContinue }: Props) => {
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>(Feedback.None);

  const levelKey = navSlugs.currentSlug.split("-", 1);

  if (navSlugs.nextSlug === "") {
    navSlugs.nextSlug = `/courses/${levelKey}`;
  }

  if (currentFeedback !== feedback) {
    setCurrentFeedback(feedback);
  }

  const getFeedbackColorStyle = (): string => {
    switch (currentFeedback) {
      case Feedback.Correct:
        return styles.correctButton;
      case Feedback.Incorrect:
        return styles.wrongButton;
      default:
        return styles.plainButton;
    }
  };

  return (
    <div>
      {currentFeedback !== Feedback.Hide && (
        <div className={styles.feedbackBar} onClick={() => {}}>
          {navSlugs.previousSlug ? (
            <Link href={navSlugs.previousSlug}>
              <a className={styles.plainButton}>Back</a>
            </Link>
          ) : (
            // If there is no previous page, we put an empty placeholder here.
            <p></p>
          )}
          {currentFeedback === Feedback.Correct && <Correct />}
          {currentFeedback === Feedback.Incorrect && <Incorrect />}
          <Link href={navSlugs.nextSlug}>
            <a className={getFeedbackColorStyle()}>Continue Old</a>
          </Link>
          <button className={getFeedbackColorStyle()} onClick={() => notifyContinue()}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonNavigation;
