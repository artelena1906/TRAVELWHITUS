import React from "react";
import styles from "./css/MainPage.module.css";
import MainPageLogo from "./tsx/MainPageLogo";
import MainPageMenu from "./tsx/MainPageMenu";
import MainPageVideoTur from "./tsx/MainPageVideoTur";
import MainPageSectionBlog from "./tsx/MainPageSectionBlog";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.fixedHeader}>
        <MainPageLogo />
        <MainPageMenu />
      </div>
      <main className={styles.mainContent}>
        <MainPageVideoTur />
        <MainPageSectionBlog />
      </main>
    </div>
  );
}