import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import useTranslation from "next-translate/useTranslation";
import Layout from "@components/Layout";
import styles from "@styles/404.module.css";

const NotFoundPage = () => {
  let { t } = useTranslation();

  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>{t("common:nothingFound")}</h4>
        <Link href="/">{t("common:backHome")}</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
