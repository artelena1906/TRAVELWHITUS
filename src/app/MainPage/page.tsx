import React from "react";
import styles from "./css/MainPage.module.css";
import MainPageLogo from "./tsx/MainPageLogo";
import MainPageMenu from "./tsx/MainPageMenu";
import Image from "next/image";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <MainPageLogo />
      <MainPageMenu />
    </div>
  );
}