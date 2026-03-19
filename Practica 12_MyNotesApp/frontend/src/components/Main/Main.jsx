import React from "react";
import styles from "./Main.module.css";

function Main({ children }) {
  return (
    <main className={styles.main}>
      {children}
      <h2 className={styles.subtitle}>Welcome to My Notes App</h2>
    </main>
  );
}

export default Main;
