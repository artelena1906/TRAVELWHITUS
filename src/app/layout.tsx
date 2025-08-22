"use client";
import React, { useEffect, useState } from "react";
import MainPageLogo from "./MainPage/tsx/MainPageLogo";
import MainPageMenu from "./MainPage/tsx/MainPageMenu";
import styles from "./MainPage/css/MainPage.module.css";
import MainPageFooter from "./MainPage/tsx/MainPageFooter";
import { usePathname } from "next/navigation";
import GuestWarning from "./MainPage/tsx/GuestWarning";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "guest";
    setRole(storedRole);
  }, []);

  return (
    <html lang="ukr">
      <head>
        <title>Мандроманія</title>
        <meta name="description" content="Авторські тури" />
      </head>
      <body>
        <div
          className={`${styles.container} ${
            role === "guest" ? styles.withGuest : ""
          }`}
        >
          {pathname !== "/" && (
            <>
              {role === "guest" && <GuestWarning />} {/* жёлтая полоса */}
              <div className={styles.fixedHeader}>
                <MainPageLogo />
                <MainPageMenu />
              </div>
            </>
          )}

          <main
            className={`${styles.mainContent} ${
              pathname === "/" ? styles.noPadding : ""
            }`}
          >
            {children}
          </main>

          {pathname !== "/" && (
            <div className={styles.footerContent}>
              <MainPageFooter />
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
