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
  return (
    <LessonPageLayout>
      <div>
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
      <LessonNavigation navSlugs={navSlugs} feedback={Feedback.None} />
    </LessonPageLayout>
  );
};

export default TextWithImageAndAudio;
