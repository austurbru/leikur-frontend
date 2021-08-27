import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import styles from "@styles/Footer.module.css";

const Footer = () => {
  let { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <p>&copy; Austurbrú 2021</p>
      <p>
        <Link href="/about">{t("common:aboutFooter")}</Link>
      </p>
    </footer>
  );
};

export default Footer;
