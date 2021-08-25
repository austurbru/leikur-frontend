import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Layout from "@components/Layout";
import AuthContext from "@context/AuthContext";
import styles from "@styles/AuthForm.module.css";

export default function LoginPage() {
  let { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> {t("login:login")}
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">{t("login:email")}</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">{t("login:password")}</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <input type="submit" value={t("login:login")} className="btn" />
        </form>
        <p>
          {t("login:noAccount")}
          <span>
            <Link href="/account/register">{" " + t("login:register")}</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
}
