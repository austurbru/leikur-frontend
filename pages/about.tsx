import Layout from "@components/Layout";
import useTranslation from "next-translate/useTranslation";
import styles from "@styles/LessonPageTemplates/AboutPage.module.css";
import Image from "next/image";

export default function AboutPage() {
  let { t } = useTranslation();

  return (
    <Layout title="This is a learning app">
      <div className={styles.top}>
    {/* <Image></Image> */}
      <h1>{t("about:title")}</h1>
      <p>{t("about:aboutText")}</p>
      <p>{t("about:version")} 1.0.0</p>
      </div>
    <main>
      <div>

      </div>

    </main>
    </Layout>
  );
}
