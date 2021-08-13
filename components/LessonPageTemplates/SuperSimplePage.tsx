import { useState } from "react";
import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import { Feedback } from "@models/enums";
import AudioImage from "@components/LessonPageContent/AudioImage";
import LessonPageWrapper from "@components/LessonPageWrapper";
import styles from "@styles/BasicPageTemplate.module.css";
import { WordCorrect } from "@models/strapi-types";
import WordCorrectPair from "@components/WordCorrectPair";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const SuperSimplePage: React.FC<Props> = ({ page, navSlugs }: Props) => {
  //const [feedback] = useState<Feedback>(Feedback.None);
  //setFeedback removed as it is not used in this demo template and that causes a TypeScript error.
  const [feedback, setFeedback] = useState<Feedback>(Feedback.None);

  //This "canContinue" state is only used if we need some conditions to allow the user to continue
  //const [canContinue, setCanContinue] = useState(true);

  // const handleCannotContinue = (): void => {
  //   //Implement custom handling here for this case:
  // };

  const audioUrl = "https://res.cloudinary.com/dkgrjtewg/video/upload/v1621382141/thjodhatid_f96264cf46.mp3";
  const imageUrl = "https://res.cloudinary.com/dkgrjtewg/image/upload/v1621382033/small_tjh1986_8824b6d8d3.jpg";

  const wordPairTrue: WordCorrect = { word: "True", isCorrect: false };
  const wordPairFalse: WordCorrect = { word: "False", isCorrect: true };
  const handleCorrect = () => {
    setFeedback(Feedback.Correct)
  };

  const handleIncorrect = () => {
    setFeedback(Feedback.Incorrect)
  };

  return (
    <LessonPageWrapper
      page={page}
      navSlugs={navSlugs}
      canContinue={true}
      feedback={feedback}
      notifyCannotContinue={() => {}}
    >
      {/*   Demonstrating how feedback can be set in the footer: */}

      <button className={styles.correctButton} onClick={() => setFeedback(Feedback.Correct)}>Send Correct</button>
      <button onClick={() => setFeedback(Feedback.Incorrect)}>Send Wrong</button>
      <button onClick={() => setFeedback(Feedback.Hide)}>Hide</button>
      <div className={styles.audioImageContainer}>
        <AudioImage imageSrcUrl={imageUrl} audioSrcUrl={audioUrl} altText="Some alt text"></AudioImage>
      </div>
      <div className={styles.mainContent}>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
          repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga
          praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure
          eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit
          sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint?
          Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem!
          Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus
          tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima
          excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad
          earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam
          cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto
          ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas
          quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!
        </p>

        <h4>The moon is made of cheese</h4>
        <p>Choose the right answer</p>

        <WordCorrectPair
          wordCorrect={wordPairTrue}
          notifyCorrect={handleCorrect}
          notifyIncorrect={handleIncorrect}
        ></WordCorrectPair>
        <WordCorrectPair
          wordCorrect={wordPairFalse}
          notifyCorrect={handleCorrect}
          notifyIncorrect={handleIncorrect}
        ></WordCorrectPair>
      </div>
    </LessonPageWrapper>
  );
};

export default SuperSimplePage;
