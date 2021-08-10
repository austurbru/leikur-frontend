import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "@styles/Backdrop.module.css";

export default function Backdrop({ selector, notifyClick }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [selector]);

  const content = <div className={styles.backdrop} onClick={notifyClick}></div>;

  return mounted
    ? createPortal(content, document.querySelector(selector))
    : null;
}

/*


onClick={props.onClick}


import React from 'react';
import ReactDOM from 'react-dom';
import './Backdrop.css';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
*/