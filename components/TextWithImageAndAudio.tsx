import { useState } from "react";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import ReactMarkdown from "react-markdown";
import NavSlugs from "@models/nav-slugs";
import LessonPageLayout from "@components/LessonPageLayout";
import LessonNavigation from "@components/LessonNavigation";
import "react-h5-audio-player/lib/styles.css";
import styles from "@styles/BasicPageTemplate.module.css";
import { PagesEntity } from "../models/strapi-types";
import { Feedback } from "@models/enums";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const TextWithImageAndAudio: React.FC<Props> = ({ page, navSlugs }: Props) => {
  const [feedback, setFeedback] = useState<Feedback>(Feedback.None);
  const [progress, setProgress] = useState<number>(
    ((page.pageInfo.pageNo - 1) * 100) / page.pageInfo.lessonTotalPageCount
  );

  return(<div></div>);


/*   return (
    <LessonPageLayout>
      <div>
        <button onClick={() => setFeedback(Feedback.Correct)}>Send Correct</button>
        <button onClick={() => setFeedback(Feedback.Incorrect)}>Send Wrong</button>
        <button onClick={() => setFeedback(Feedback.Hide)}>Hide</button>
        <button onClick={() => setProgress((page.pageInfo.pageNo * 100) / page.pageInfo.lessonTotalPageCount)}>
          Complete Page
        </button>
        <p>{`Progress: ${progress}%`}</p>
        <p>{`Page: ${page.pageInfo.pageNo} of ${page.pageInfo.lessonTotalPageCount}`}</p>
        <h3>{page.title}</h3>
        <div>
          <div>
            {page.image && (
              <div className={styles.image}>
                <Image src={page.image.formats.medium.url} width={960} height={600} />
              </div>
            )}
          </div>
          <AudioPlayer src={page.audio.url} />
          <div>
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
        </div>
      </div>
      <LessonNavigation navSlugs={navSlugs} feedback={feedback} />
    </LessonPageLayout>
  ); */
};

export default TextWithImageAndAudio;
