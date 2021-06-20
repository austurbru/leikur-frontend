import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  ClosedCaptionButton,
  BigPlayButton,
} from "video-react";
import { PagesEntity } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import Layout from "@components/Layout";
import "../node_modules/video-react/dist/video-react.css";
import styles from "@styles/BasicPageTemplate.module.css";

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const TextWithImageAndVideo: React.FC<Props> = ({ page, navSlugs }: Props) => {
  const levelKey = page.pageInfo.slug.split("-", 1);

  return (
    <Layout>
      <div>
        <h3>{page.title}</h3>
        <div>
          <div>
            <Player>
              <source src={page.video.url} />
              <BigPlayButton position="center" />
              <ControlBar>
                <VolumeMenuButton />
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <ClosedCaptionButton order={7.1} />
                <PlaybackRateMenuButton rates={[2, 1, 0.5]} order={7.2} />
              </ControlBar>
            </Player>
          </div>
          <div>
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className={styles.link}>
        {navSlugs.previousSlug && (
          <Link href={navSlugs.previousSlug}>
            <a className={styles.button}>Back</a>
          </Link>
        )}
      </div>
      <div className={styles.link}>
        {navSlugs.nextSlug ? (
          <Link href={navSlugs.nextSlug}>
            <a className={styles.button}>Next</a>
          </Link>
        ) : (
          <Link href={`/courses/${levelKey}`}>
            <a className={styles.button}>Go to lessons</a>
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default TextWithImageAndVideo;
