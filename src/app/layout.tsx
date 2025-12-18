// "use client";
// import React, { useEffect, useState } from "react";
// import MainPageLogo from "./MainPage/tsx/MainPageLogo";
// import MainPageMenu from "./MainPage/tsx/MainPageMenu";
// import MainPageFooter from "./MainPage/tsx/MainPageFooter";
// import GuestWarning from "./MainPage/tsx/GuestWarning";
// import styles from "./MainPage/css/MainPage.module.css";
// import { usePathname } from "next/navigation";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const [role, setRole] = useState<string>("guest");
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     const storedRole = localStorage.getItem("role") || "guest";
//     setRole(storedRole);
//   }, []);

//   const isAdminRoute = isClient && pathname?.startsWith("/adminka");

//   return (
//     <html lang="uk">
//       <head>
//         <title>Мандроманія</title>
//         <meta name="description" content="Авторські тури" />
//       </head>
//       <body>
//         {/* Фиксированный хедер — вынесен из контейнера */}
//         {isClient && !isAdminRoute && pathname !== "/" && (
//           <div
//             className={`${styles.fixedHeader} ${
//               role === "guest" ? styles.withGuest : ""
//             }`}
//           >
//             {role === "guest" && <GuestWarning />}
//             <MainPageLogo />
//             <MainPageMenu />
//           </div>
//         )}

//         <div
//           className={`${styles.container} ${
//             role === "guest" ? styles.withGuest : ""
//           }`}
//         >
//           {/* Основной контент */}
//           <main
//             className={`${styles.mainContent} ${
//               pathname === "/" ? styles.noPadding : ""
//             }`}
//           >
//             {children}
//           </main>

//           {/* Футер */}
//           {isClient && !isAdminRoute && pathname !== "/" && (
//             <div className={styles.footerContent}>
//               <MainPageFooter />
//             </div>
//           )}
//         </div>
//       </body>
//     </html>
//   );
// }


// import type { Metadata } from "next";
// import LayoutShell from "./LayoutShell";

// export const metadata: Metadata = {
//   title: "Мандроманія",
//   description: "Авторські тури",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="uk">
//       <body>
//         <LayoutShell>{children}</LayoutShell>
//       </body>
//     </html>
//   );
// }


"use client";

import React from "react";
import "./globals.css";
import MainPageLogo from "./MainPage/tsx/MainPageLogo";
import MainPageMenu from "./MainPage/tsx/MainPageMenu";
import MainPageFooter from "./MainPage/tsx/MainPageFooter";
import styles from "./MainPage/css/MainPage.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Мы убрали usePathname и проверки. Хедер и футер рендерятся всегда.

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
          <MainPageMenu />
        </div>

        <div className={styles.container}>
          {/* Убрали лишние классы, так как отступы нужны всегда */}
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