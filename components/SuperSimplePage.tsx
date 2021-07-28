import { useState } from "react";
import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import AudioImage from "@components/AudioImage";
import LessonPageWrapper from "@components/LessonPageWrapper";
import styles from "@styles/BasicPageTemplate.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const SuperSimplePage: React.FC<Props> = ({ page, navSlugs }: Props) => {
  
  const [feedback] = useState<Feedback>(Feedback.None);
  //setFeedback removed as it is not used in this demo template and that causes a TypeScript error.
  //const [feedback, setFeedback] = useState<Feedback>(Feedback.None);

  //This "canContinue" state is only used if we need some conditions to allow the user to continue
  //const [canContinue, setCanContinue] = useState(true);

  // const handleCannotContinue = (): void => {
  //   //Implement custom handling here for this case:
  // };

  const audioUrl = "https://res.cloudinary.com/dkgrjtewg/video/upload/v1621382141/thjodhatid_f96264cf46.mp3";
  const imageUrl = "https://res.cloudinary.com/dkgrjtewg/image/upload/v1621382033/small_tjh1986_8824b6d8d3.jpg";

  return (
    <LessonPageWrapper
      page={page}
      navSlugs={navSlugs}
      canContinue={true}
      feedback={feedback}
      notifyCannotContinue={() => {}}
    >
{/*   Demonstrating how feedback can be set in the footer:

      <button onClick={() => setFeedback(Feedback.Correct)}>Send Correct</button>
      <button onClick={() => setFeedback(Feedback.Incorrect)}>Send Wrong</button>
      <button onClick={() => setFeedback(Feedback.Hide)}>Hide</button> */}
      <div className={styles.audioImageContainer}>
        <AudioImage imageUrl={imageUrl} audioUrl={audioUrl}></AudioImage>
      </div>
    </LessonPageWrapper>
  );
};

export default SuperSimplePage;
