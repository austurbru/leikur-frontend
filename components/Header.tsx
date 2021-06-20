/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import styles from "@styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Það er leikur að læra</a>
        </Link>
      </div>
      <nav />
    </header>
  );
};

export default Header;
