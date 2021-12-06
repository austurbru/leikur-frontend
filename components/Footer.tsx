import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import styles from "@styles/Footer.module.css";
import Image from "next/image";
import logo from "../public/images/austurbru-logo.png";

const Footer = () => {
  let { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      {/* <button className="ui circular facebook icon button">
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
      </button> */}
      <div className= {styles.austurbru}>
      <p>Copyright &copy; Austurbrú 2021</p>
      {/* <p>
        <Link href="/about">{t("common:aboutFooter")}</Link>
      </p> */}
      <Image src={logo} alt="Austurbrú logo" width={90} height={70} />
      </div>
    </footer>
  );
};

export default Footer;
