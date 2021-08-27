import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Showcase from "@components/Showcase";
import styles from "@styles/Layout.module.css";

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
  children?: any;
}

const Layout = ({ title, keywords, description, children }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
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
