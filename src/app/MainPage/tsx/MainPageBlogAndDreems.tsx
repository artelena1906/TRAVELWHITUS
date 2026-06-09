import React from 'react';
import styles from "../css/MainPageBlogAndDreems.module.css";
import MainPageSectionBlog from "./MainPageSectionBlog";
import MainPageSectionDreems from "./MainPageSectionDreems";

export default function MainPageBlogAndDreems() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionBlog}>
        <MainPageSectionBlog />
      </div>
      
      <div className={styles.sectionDreams}>
        <MainPageSectionDreems />
      </div>
    </div>
  );
}