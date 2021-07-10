import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Feedback } from "@models/enums";

import LessonPageLayout from "@components/LessonPageLayout";
import LessonNavigation from "@components/LessonNavigation";
import ReactMarkdown from "react-markdown";
import AuthContext from "@context/AuthContext";

import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import styles from "@styles/BasicPageTemplate.module.css";
import { Button } from "semantic-ui-react";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const SuperSimplePage: React.FC<Props> = ({ page, navSlugs }: Props) => {
  const [feedback, setFeedback] = useState<Feedback>(Feedback.None);
  const [progress, setProgress] = useState<number>(
    ((page.pageInfo.pageNo - 1) * 100) / page.pageInfo.lessonTotalPageCount
  );

  const [isClosing, setIsClosing] = useState<boolean>(false);

  const router = useRouter();
  const { setCurrentLessonCompleted, setCurrentPageSlug } = useContext(AuthContext);

  const handleContinueNotification = () => {
    // localProgress is necessary here because the setState hook does not make
    // the state immediatly available for futher calculations.
    let localProgress = progress;
    if (canContinue()) {
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
      console.log("progress === 100");
    }

    setFeedback(Feedback.None);

    router.push(navSlugs.nextSlug);
  };

  const canContinue = (): boolean => {
    // Implement custom validation here to determine
    // if the user can go to the next page.
    return true;
  };

  const handleCannotContinue = (): void => {
    //Implement custom handling here for this case:
  };

  const close = (): void => {
    setIsClosing(true);
    setCurrentPageSlug(`lessons/${page.pageInfo.slug}`);
    router.push("/courses");
  };

  return (
    <div>
      <LessonPageLayout>
        <div>
          <button onClick={() => setFeedback(Feedback.Correct)}>Send Correct</button>
          <button onClick={() => setFeedback(Feedback.Incorrect)}>Send Wrong</button>
          <button onClick={() => setFeedback(Feedback.Hide)}>Hide</button>
          <p>{`Progress: ${progress}%`}</p>
          <p>{`Page: ${page.pageInfo.pageNo} of ${page.pageInfo.lessonTotalPageCount}`}</p>
          <h3>{page.title}</h3>
          <Button fluid size="large" color="teal" content="X" loading={isClosing} onClick={() => close()} />

          <div>
            <div>
              <ReactMarkdown>{page.content}</ReactMarkdown>
            </div>
          </div>
        </div>
        <LessonNavigation navSlugs={navSlugs} feedback={feedback} notifyContinue={handleContinueNotification} />
      </LessonPageLayout>
    </div>
  );
};

export default SuperSimplePage;
