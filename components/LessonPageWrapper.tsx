import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Feedback } from "@models/enums";
import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import AuthContext from "@context/AuthContext";
import LessonPageLayout from "@components/LessonPageLayout";
import LessonPageHeader from "@components/LessonPageHeader";
import LessonNavigation from "@components/LessonNavigation";
import styles from "@styles/LessonPageWrapper.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
  canContinue: boolean;
  feedback: Feedback;
  notifyCannotContinue: () => void;
  children: React.ReactNode;
}

const LessonPageWrapper = ({ page, navSlugs, canContinue, feedback, notifyCannotContinue, children }: Props) => {
  //Set the progress:
  const [progress, setProgress] = useState<number>(
    ((page.pageInfo.pageNo - 1) * 100) / page.pageInfo.lessonTotalPageCount
  );

  const router = useRouter();
  const { setCurrentLessonCompleted } = useContext(AuthContext);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>(Feedback.None);

  if (currentFeedback !== feedback) {
    setCurrentFeedback(feedback);
  }

  const handleContinueNotification = () => {
    // localProgress is necessary here because the setState hook does not make
    // the state immediatly available for futher calculations.
    let localProgress = progress;
    if (canContinue) {
      localProgress = (page.pageInfo.pageNo * 100) / page.pageInfo.lessonTotalPageCount;
      setProgress(localProgress);
    } else {
      notifyCannotContinue;
      return;
    }

    //If the progress is 100 we need to
    // update the user to set the current lesson as 'completed'
    if (localProgress === 100) {
      setCurrentLessonCompleted();
    }

    router.push(navSlugs.nextSlug);
  };

  return (
    <div className={styles.container}>
      <LessonPageHeader progress={progress} slug={page.pageInfo.slug}></LessonPageHeader>
      <LessonPageLayout>
        <div className={styles.info}></div>
        <div className={styles.mainContainer}>
          <h2>{page.instructions}</h2>
          {children}
        </div>
        <LessonNavigation navSlugs={navSlugs} feedback={currentFeedback} notifyContinue={handleContinueNotification} />
      </LessonPageLayout>
    </div>
  );
};

export default LessonPageWrapper;
