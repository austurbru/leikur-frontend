/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import LanguageSelection from "@components/LanguageSelection";
import AuthContext from "@context/AuthContext";
import styles from "@styles/Header.module.css";

const Header = () => {
  let { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logoAndLeikur}>
        <Link href="/">
          <a>
            <Image src={"/images/leikur-logo.png"} alt="logo" width="53px" height="50px" />
          </a>
        </Link>

        <div className={styles.logo}>
          <Link href="/">
            {/* <Image src={logo.png} /> */}
            <a>Það er leikur að læra</a>
          </Link>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <LanguageSelection />
          </li>
          {user ? (
            // If logged in
            <>
              {/* <li>
                <Link href="/courses">{t("common:courses")}</Link>
              </li> */}
              <li>
                <button onClick={() => logout()} className="btn-secondary btn-icon">
                  <FaSignOutAlt />
                  {t("common:logout")}
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt />
                    {t("common:login")}
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
