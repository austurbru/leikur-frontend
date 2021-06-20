import Image from "next/image";
import Link from "next/link";
import AudioPlayer from "react-h5-audio-player";
import ReactMarkdown from "react-markdown";
import NavSlugs from "@models/nav-slugs";
import Layout from "@components/Layout";
import "react-h5-audio-player/lib/styles.css";
import styles from "@styles/BasicPageTemplate.module.css";
import { PagesEntity } from '../models/strapi-types';

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}


const TextWithImageAndAudio: React.FC<Props> = ({ page, navSlugs }: Props) => {
  const levelKey = page.pageInfo.slug.split("-", 1);

  return (
    <Layout>
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

export default TextWithImageAndAudio;
