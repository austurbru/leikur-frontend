import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";

const Layout: React.FC<{ title?: string; keywords?: string; description?: string }> = (props) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
      </Head>

      <Header />

      {router.pathname === "/" && <Showcase />}

      <div className={styles.container}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Learning Icelandic | Find the best solution to learn",
  description: "Learn Icelandic website",
  keywords: "Icelandic, learn, læra, language",
};
