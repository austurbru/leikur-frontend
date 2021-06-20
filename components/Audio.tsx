import Link from "next/link";
import Layout from "@components/Layout";
import { Page } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import styles from "@styles/BasicPageTemplate.module.css";
import AudioPlayer from "react-h5-audio-player";

import Image from 'next/image';

interface Props {
  page: Page;
  navSlugs: NavSlugs;
}

const Audio: React.FC<Props> = ({ page, navSlugs, }: Props) => {
  const levelKey = page.slug.split("-", 1);

  return (
    <Layout>
      <h1>This is Audio template</h1>
      <h1>{page.title}</h1>
      
      <div>
            {page.image && (
              <div className={styles.image}>
                <Image src={page.image.formats.medium.url} width={960} height={600} />
              </div>
             
            )}
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

export default Audio;
