import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@styles/Layout.module.css";

import Showcase from "./Showcase";

const LessonPageLayout: React.FC<{ title?: string; keywords?: string; description?: string }> = (props) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
      </Head>

      {router.pathname === "/" && <Showcase />}

      <div className={styles.container}>{props.children}</div>
    </div>
  );
};

export default LessonPageLayout;

LessonPageLayout.defaultProps = {
  title: "Learning Icelandic | Find the best solution to learn",
  description: "Learn Icelandic website",
  keywords: "Icelandic, learn, læra, language",
};
