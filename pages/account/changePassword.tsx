import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTranslation from "next-translate/useTranslation";
import Layout from "@components/Layout";
import AuthContext from "@context/AuthContext";
import styles from "@styles/AuthForm.module.css";

const ChangePassword = () => {
  const router = useRouter();
  let { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error(t("password:passwordsDoNotMatch"));
      return;
    }

    if (password.length < 7) {
      toast.error(t("password:minimumPasswordLength"));
      return;
    }

    toast.info(t("password:notImplemented"), { autoClose: 3000, hideProgressBar: false, closeOnClick: true });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> {t("password:changePassword")}
        </h1>
        <ToastContainer />
        <div>
          <div>
            <label htmlFor="password">{t("password:password")}</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="passwordConfirm">{t("password:confirmPassword")}</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className={styles.buttonGroupContainer}>
            <div className={styles.buttonContainer}>
              <Button fluid basic color="yellow" onClick={handleCancel}>
                {t("password:cancel")}
              </Button>
            </div>
            <div className={styles.buttonContainer}>
              <Button fluid color="yellow" onClick={handleSubmit}>
                {t("password:changePassword")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
