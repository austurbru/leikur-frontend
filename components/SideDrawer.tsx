import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "@styles/SideDrawer.module.css";

export default function SideDrawer({ children, selector, show }: { children: any; selector: any; show: any }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [selector]);

  const content = (
    <CSSTransition in={show} timeout={1000} classNames="slide-in-left" mountOnEnter unmountOnExit>
      <aside className={styles.sidedrawer}>{children}</aside>
    </CSSTransition>
  );
  return mounted ? createPortal(content, document.querySelector(selector)) : null;
}
