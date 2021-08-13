import Layout from "@components/Layout";
import useTranslation from "next-translate/useTranslation";

export default function AboutPage() {
  let { t } = useTranslation();

  return (
    <Layout title="This is a learning app">
      <h1>{t("about:title")}</h1>
      <p>{t("about:aboutText")}</p>
      <p>{t("about:version")} 1.0.0</p>
    </Layout>
  );
}
