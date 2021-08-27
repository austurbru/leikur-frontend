import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "@styles/SideDrawer.module.css";

interface Props {
  selector: any;
  show: any;
  children: JSX.Element[] | JSX.Element;
}

const SideDrawer = ({ selector, show, children }: Props) => {
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
};

export default SideDrawer;
