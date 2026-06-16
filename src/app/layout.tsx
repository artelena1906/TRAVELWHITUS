"use client";

import React from "react";
import MainPageLogo from "./MainPage/tsx/MainPageLogo";
import MainPageFooter from "./MainPage/tsx/MainPageFooter";
import styles from "./MainPage/css/MainPage.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  //Хедер и футер рендерятся всегда.

  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <title>Мандроманія</title>
        <meta name="description" content="Авторські тури" />
      </head>

      <body suppressHydrationWarning>
        {/* Хедер всегда на месте */}
        <div className={styles.fixedHeader}>
          <MainPageLogo />
        </div>

        <div className={styles.container}>
          <main className={styles.mainContent}>
            {children}
          </main>

          {/* Футер всегда на месте */}
          <div className={styles.footerContent}>
            <MainPageFooter />
          </div>
        </div>
      </body>
    </html>
  );
}