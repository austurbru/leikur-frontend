import { useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { Button } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { Feedback } from "@models/enums";
import NavSlugs from "@models/nav-slugs";
import Correct from "@components/Correct";
import Incorrect from "@components/Incorrect";
import styles from "@styles/LessonNavigation.module.css";

interface Props {
  navSlugs: NavSlugs;
  feedback: Feedback;
  notifyContinue: () => void;
}

const LessonNavigation = ({ navSlugs, feedback, notifyContinue }: Props) => {
  let { t } = useTranslation();
  const router = useRouter();
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>(Feedback.None);
  const [backButtonIsLoading, setBackButtonIsLoading] = useState(false);
  const [continueButtonIsLoading, setContinueButtonIsLoading] = useState(false);

  const levelKey = navSlugs.currentSlug.split("-", 1);

  if (navSlugs.nextSlug === "") {
    navSlugs.nextSlug = `/courses/${levelKey}`;
  }

  if (currentFeedback !== feedback) {
    setCurrentFeedback(feedback);
  }

  const handleBackClick = () => {
    setBackButtonIsLoading(true);
    router.push(`${navSlugs.previousSlug}`);
    setBackButtonIsLoading(false);
  };

  const handleContinueClick = () => {
    setContinueButtonIsLoading(true);
    notifyContinue();
    setContinueButtonIsLoading(false);
  };

  let continueColor: SemanticCOLORS;
  switch (currentFeedback) {
    case Feedback.Correct:
      continueColor = "green";
      break;
    case Feedback.Incorrect:
      continueColor = "red";
      break;
    default:
      continueColor = "blue";
  }

  return (
    <div>
      {currentFeedback !== Feedback.Hide && (
        <div className={styles.feedbackBar} onClick={() => {}}>
          {navSlugs.previousSlug ? (
            /*             loading={backButtonIsLoading} */
            <Button basic color="blue" size="small" loading={backButtonIsLoading} onClick={() => handleBackClick()}>
              {t("common:back")}
            </Button>
          ) : (
            // If there is no previous page, we put an empty placeholder here.
            <p></p>
          )}
          {currentFeedback === Feedback.Correct && <Correct />}
          {currentFeedback === Feedback.Incorrect && <Incorrect />}
          {/*           loading={continueButtonIsLoading}  */}
          <Button
            color={continueColor}
            size="small"
            loading={continueButtonIsLoading}
            onClick={() => handleContinueClick()}
          >
            {t("common:continue")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LessonNavigation;
