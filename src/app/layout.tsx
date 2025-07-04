"use client"; // Добавляем, так как используем клиентский хук
import React from "react";
import MainPageLogo from "./MainPage/tsx/MainPageLogo";
import MainPageMenu from "./MainPage/tsx/MainPageMenu";
import styles from "./MainPage/css/MainPage.module.css";
import MainPageFooter from "./MainPage/tsx/MainPageFooter";
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Получаем текущий маршрут

  return (
    <html lang="ukr">
      <head>
        <title>Мандроманія</title>
        <meta name="description" content="Авторські тури" />
      </head>
      <body>
        <div className={styles.container}>
          {pathname !== "/" && (
            <div className={styles.fixedHeader}>
              <MainPageLogo />
              <MainPageMenu />
            </div>
          )}
          <main
            className={`${styles.mainContent} ${
              pathname === "/" ? styles.noPadding : ""
            }`}
          >
            {children}
          </main>
          <div className={styles.footerContent}>
            <MainPageFooter />
          </div>
        </div>
      </body>
    </html>
  );
}