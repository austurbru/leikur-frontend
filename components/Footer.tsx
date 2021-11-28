import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import styles from "@styles/Footer.module.css";

const Footer = () => {
  let { t } = useTranslation();
  return (
    <footer className={styles.footer}>
            <button className="ui circular facebook icon button">
  <i className="facebook icon"></i>
</button>
<button className="ui circular twitter icon button">
  <i className="twitter icon"></i>
</button>
<button className="ui circular linkedin icon button">
  <i className="linkedin icon"></i>
</button>
<button className="ui circular google plus icon button">
  <i className="google plus icon"></i>
</button>
      <p>&copy; Austurbrú 2021</p>
      <p>
        <Link href="/about">{t("common:aboutFooter")}</Link>
      </p>
    </footer>
  );
};

export default Footer;
