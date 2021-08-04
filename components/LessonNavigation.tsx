import { useRouter } from "next/router";
import NavSlugs from "@models/nav-slugs";
import { Button } from "semantic-ui-react"
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
  const router = useRouter();
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>(Feedback.None);
  //const [backButtonIsLoading, setBackButtonIsLoading] = useState(false);
 // const [continueButtonIsLoading, setContinueButtonIsLoading] = useState(false);

  const levelKey = navSlugs.currentSlug.split("-", 1);

  if (navSlugs.nextSlug === "") {
    navSlugs.nextSlug = `/courses/${levelKey}`;
  }

  if (currentFeedback !== feedback) {
    setCurrentFeedback(feedback);
  }

  // const getFeedbackColorStyle = (): string => {
  //   switch (currentFeedback) {
  //     case Feedback.Correct:
  //       return styles.correctButton;
  //     case Feedback.Incorrect:
  //       return styles.wrongButton;
  //     default:
  //       return styles.plainButton;
  //   }
  // };

  const handleBackClick = () => {
   // setBackButtonIsLoading(true)
    router.push(`${navSlugs.previousSlug}`);
  }

  const handleContinueClick = () => {
  //  setContinueButtonIsLoading(true)
    notifyContinue()
  }

  return (
    <div>
      {currentFeedback !== Feedback.Hide && (
        <div className={styles.feedbackBar} onClick={() => {}}>
          {navSlugs.previousSlug ? (
/*             loading={backButtonIsLoading} */
            <Button basic color="blue" onClick={() => handleBackClick()}>
            Back
          </Button>
          ) : (
            // If there is no previous page, we put an empty placeholder here.
            <p></p>
          )}
          {currentFeedback === Feedback.Correct && <Correct />}
          {currentFeedback === Feedback.Incorrect && <Incorrect />}
{/*           loading={continueButtonIsLoading}  */}
          <Button color="blue" onClick={() => handleContinueClick()}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default LessonNavigation;
