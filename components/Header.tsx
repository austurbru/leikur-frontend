/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { useRouter } from "next/router";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Popup, Dropdown } from "semantic-ui-react";
import useTranslation from "next-translate/useTranslation";
import LanguageSelection from "@components/LanguageSelection";
import AuthContext from "@context/AuthContext";
import styles from "@styles/Header.module.css";

const Header = () => {
  const router = useRouter();
  let { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  const changePassword = () => {
    router.push("/account/changePassword");
  };

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
            <li>
              <Popup
                content={user?.username}
                trigger={
                  <Dropdown icon={{ name: "user", size: "large" }} className={styles.userDropdown}>
                    <Dropdown.Menu>
                      <Dropdown.Item icon="lock" text={t("common:changePassword")} onClick={() => changePassword()} />
                      <Dropdown.Item icon="logout" text={t("common:logout")} onClick={() => logout()} />
                    </Dropdown.Menu>
                  </Dropdown>
                }
              />
            </li>
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
