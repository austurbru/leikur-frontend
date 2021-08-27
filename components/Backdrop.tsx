import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "@styles/Backdrop.module.css";

const Backdrop = ({ selector, notifyClick }: { selector: any; notifyClick: any }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [selector]);

  const content = <div className={styles.backdrop} onClick={notifyClick}></div>;

  return mounted ? createPortal(content, document.querySelector(selector)) : null;
};

export default Backdrop;
