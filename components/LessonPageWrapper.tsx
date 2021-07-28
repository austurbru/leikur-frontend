import { useState, useContext, Children } from "react";
import { useRouter } from "next/router";
import { Feedback } from "@models/enums";

import LessonPageLayout from "@components/LessonPageLayout";
import LessonPageHeader from "@components/LessonPageHeader";
import LessonNavigation from "@components/LessonNavigation";
import AudioImage from "@components/AudioImage";

import ReactMarkdown from "react-markdown";
import AuthContext from "@context/AuthContext";

import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import styles from "@styles/BasicPageTemplate.module.css";
import LessonPage from "../pages/lessons/[slug]";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
  canContinue: boolean;
  children: any;
}

const LessonPageWrapper: React.FC<Props> = ({ page, navSlugs, canContinue, children }: Props) => {
  const [feedback, setFeedback] = useState<Feedback>(Feedback.None);
  //Set the progress:
  const [progress, setProgress] = useState<number>(
    ((page.pageInfo.pageNo - 1) * 100) / page.pageInfo.lessonTotalPageCount
  );

  const { setCurrentLessonCompleted } = useContext(AuthContext);

  const router = useRouter();

  const handleContinueNotification = () => {
    // localProgress is necessary here because the setState hook does not make
    // the state immediatly available for futher calculations.
    let localProgress = progress;
    if (canContinue) {
      localProgress = (page.pageInfo.pageNo * 100) / page.pageInfo.lessonTotalPageCount;
      setProgress(localProgress);
    } else {
      handleCannotContinue;
      return;
    }

    //If the progress is 100 we need to
    // update the user to set the current lesson as 'completed'
    if (localProgress === 100) {
      setCurrentLessonCompleted();
    }

    //Feedback.None : buttons on LessonNavigation set to normal color
    setFeedback(Feedback.None);

    router.push(navSlugs.nextSlug);
  };

  // const canContinue = (): boolean => {
  //   // Implement custom validation here to determine
  //   // if the user can go to the next page.
  //   return true;
  // };

  const handleCannotContinue = (): void => {
    //Implement custom handling here for this case:
  };


  return (
    <div className={styles.container}>
      <LessonPageHeader progress={progress} slug={page.pageInfo.slug}></LessonPageHeader>
      <LessonPageLayout>
        <div className={styles.info}></div>
        <div>
          <h3>{page.title}</h3>
          {children}
        </div>
        <LessonNavigation navSlugs={navSlugs} feedback={feedback} notifyContinue={handleContinueNotification} />
      </LessonPageLayout>
    </div>
  );
};

export default LessonPageWrapper;
