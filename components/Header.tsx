/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import Link from "next/link";
import AuthContext from "@context/AuthContext";
import styles from "@styles/Header.module.css";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Það er leikur að læra</a>
        </Link>
      </div>
      <nav>
        <ul>
          {user ? (
            // If logged in
            <>
              <li>
                <Link href="/courses">X</Link>
              </li>
              <li>
                <button onClick={() => logout()} className="btn-secondary btn-icon">
                  <FaSignOutAlt />
                  Logout
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
                    Login
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
