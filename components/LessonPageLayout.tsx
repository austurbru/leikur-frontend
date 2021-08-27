import Head from "next/head";
import { useRouter } from "next/router";
import Showcase from "@components/Showcase";
import styles from "@styles/LessonPageLayout.module.css";

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
  children?: any;
}

const LessonPageLayout = ({ title, keywords, description, children }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default LessonPageLayout;

LessonPageLayout.defaultProps = {
  title: "Learning Icelandic | Find the best solution to learn",
  description: "Learn Icelandic website",
  keywords: "Icelandic, learn, læra, language",
};
