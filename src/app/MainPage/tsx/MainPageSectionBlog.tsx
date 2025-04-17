import React from "react";
import styles from "../css/MainPageSectionBlog.module.css";

export default function MainPageSectionBlog() {
    return (
    <div className={styles.containerBlog}>
        <div className={styles.containerBlogTitle}>
            <h1>Блог</h1>
            <button className={styles.buttonBlog}> Всі статті Блогу</button>
        </div>
        <hr className={styles.hr}/>

        
    </div>
    );
}