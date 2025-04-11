import React from "react";
import styles from "./css/MainPage.module.css";
import MainPageLogo from "./tsx/MainPageLogo";
import MainPageMenu from "./tsx/MainPageMenu";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <MainPageLogo />
      <MainPageMenu />
    </div>
  );
}