// "use client";
// import React, { useEffect, useState } from "react";
// import MainPageLogo from "./MainPage/tsx/MainPageLogo";
// import MainPageMenu from "./MainPage/tsx/MainPageMenu";
// import styles from "./MainPage/css/MainPage.module.css";
// import MainPageFooter from "./MainPage/tsx/MainPageFooter";
// import { usePathname } from "next/navigation";
// import GuestWarning from "./MainPage/tsx/GuestWarning";

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
//         <div
//           className={`${styles.container} ${
//             role === "guest" ? styles.withGuest : ""
//           }`}
//         >
//           {/* Хедер и футер показываем только если не админка и на клиенте */}
//           {isClient && !isAdminRoute && pathname !== "/" && (
//             <>
//               {role === "guest" && <GuestWarning />}
//               <div className={styles.fixedHeader}>
//                 <MainPageLogo />
//                 <MainPageMenu />
//               </div>
//             </>
//           )}

//           <main
//             className={`${styles.mainContent} ${
//               pathname === "/" ? styles.noPadding : ""
//             }`}
//           >
//             {children}
//           </main>

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

"use client";
import React, { useEffect, useState } from "react";
import MainPageLogo from "./MainPage/tsx/MainPageLogo";
import MainPageMenu from "./MainPage/tsx/MainPageMenu";
import MainPageFooter from "./MainPage/tsx/MainPageFooter";
import GuestWarning from "./MainPage/tsx/GuestWarning";
import styles from "./MainPage/css/MainPage.module.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [role, setRole] = useState<string>("guest");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedRole = localStorage.getItem("role") || "guest";
    setRole(storedRole);
  }, []);

  const isAdminRoute = isClient && pathname?.startsWith("/adminka");

  return (
    <html lang="uk">
      <head>
        <title>Мандроманія</title>
        <meta name="description" content="Авторські тури" />
      </head>
      <body>
        {/* Фиксированный хедер — вынесен из контейнера */}
        {isClient && !isAdminRoute && pathname !== "/" && (
          <div
            className={`${styles.fixedHeader} ${
              role === "guest" ? styles.withGuest : ""
            }`}
          >
            {role === "guest" && <GuestWarning />}
            <MainPageLogo />
            <MainPageMenu />
          </div>
        )}

        <div
          className={`${styles.container} ${
            role === "guest" ? styles.withGuest : ""
          }`}
        >
          {/* Основной контент */}
          <main
            className={`${styles.mainContent} ${
              pathname === "/" ? styles.noPadding : ""
            }`}
          >
            {children}
          </main>

          {/* Футер */}
          {isClient && !isAdminRoute && pathname !== "/" && (
            <div className={styles.footerContent}>
              <MainPageFooter />
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
