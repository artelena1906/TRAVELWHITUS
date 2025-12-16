"use client";

import React from "react";
import { usePathname } from "next/navigation";

import MainPageLogo from "./MainPage/tsx/MainPageLogo";
import MainPageMenu from "./MainPage/tsx/MainPageMenu";
import MainPageFooter from "./MainPage/tsx/MainPageFooter";
import styles from "./MainPage/css/MainPage.module.css";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStartPage = pathname === "/";

  return (
    <>
      {/* Хедер — только НЕ на стартовой */}
      {!isStartPage && (
        <div className={styles.fixedHeader}>
          <MainPageLogo />
          <MainPageMenu />
        </div>
      )}

      {/* Контент */}
      <div className={styles.container}>
        <main className={`${styles.mainContent} ${isStartPage ? styles.noPadding : ""}`}>
          {children}
        </main>

        {/* Футер — только НЕ на стартовой */}
        {!isStartPage && (
          <div className={styles.footerContent}>
            <MainPageFooter />
          </div>
        )}
      </div>
    </>
  );
}
