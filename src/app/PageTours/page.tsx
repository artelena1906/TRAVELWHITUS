'use client';
import { Suspense } from 'react';
import React from "react";
import styles from "./css/PageTours.module.css"; // Убедитесь, что этот файл существует
import Search from "../MainPage/tsx/MainPageSearch";
import Tours from "../MainPage/tsx/MainPageSectionTour";

export default function PageTours() {
  return (
    <div className={styles.container}>
  <div className={styles.leftcolumn}>
    <Suspense fallback={<div>Завантаження фільтрів...</div>}>
      <Search />
    </Suspense>
  </div>
  <div className={styles.rightcolumn}>
    <Tours/>
  </div>
</div>

  );
}