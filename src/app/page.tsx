// "use client";
// import { useEffect, useState } from "react";
// import styles from "./MainPageStart.module.css";
// // import AuthForm from "../components/AuthForm";
// import { useRouter } from "next/navigation"; // Хук для навигации

// export default function Home() {
//   const [showText, setShowText] = useState<boolean>(false);
//   const [showButton, setShowButton] = useState<boolean>(false);
//   const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
//   // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   // const [errorMessage, setErrorMessage] = useState<string>("");

//   const router = useRouter(); 

//   useEffect(() => {
//     const textTimer = setTimeout(() => {
//       setShowText(true);
//     }, 3000); // Текст через 3 секунды

//     const buttonTimer = setTimeout(() => {
//       setShowButton(true);
//     }, 12500); // Кнопка через 9.5 секунд

//     return () => {
//       clearTimeout(textTimer);
//       clearTimeout(buttonTimer);
//     };
//   }, []);

//   // const handleOpenForm = (): void => setIsFormOpen(true);
//   const handleCloseForm = (): void => setIsFormOpen(false);

//   // const handleLogin = async (email: string, password: string): Promise<void> => {
//   //   try {
//   //     const response = await fetch("/api/login", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ email, password }),
//   //     });

//   //     const data = await response.json();

//   //     if (response.status === 200) {
//   //       setIsLoggedIn(true);
//   //       localStorage.setItem("token", data.token);
//   //       handleCloseForm();

//   //       // Переход на страницу /MainPage
//   //       router.push("/MainPage"); 
//   //     } else {
//   //       setErrorMessage(data.message);
//   //     }
//   //   } catch {
//   //     setErrorMessage("Что-то пошло не так, попробуйте снова.");
//   //   }
//   // };

//   // const handleLogout = (): void => {
//   //   localStorage.removeItem("token");
//   //   setIsLoggedIn(false);
//   // };

//   return (
//     <div className={styles.container}>
//       <video autoPlay loop muted playsInline className={styles.video}>
//         <source src="/img/titlevideo.mp4" type="video/mp4" />
//         Ваш браузер не підтримує відео.
//       </video>
//       <div className={styles.overlay}></div>

//       {showText && (
//         <div className={styles.content}>
//           <div className={styles.typewriter}>
//             <h1>Мрії, що оживають у мандрах</h1>
//             <h3>Авторські подорожі з душею та драйвом</h3>
//           </div>
//           {/* {showButton && (
//             <>
//               {isLoggedIn ? (
//                 <button
//                   className={`${styles.button} ${styles.show}`}
//                   onClick={handleLogout}
//                 >
//                   Вихід
//                 </button>
//               ) : (
//                 <button
//                   className={`${styles.button} ${styles.show}`}
//                   onClick={handleOpenForm}
//                 >
//                   Вхід
//                 </button>
//               )}
//             </>
//           )} */}
//         </div>
//       )}

//       {/* {isFormOpen && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <button className={styles.closeButton} onClick={handleCloseForm}>
//               ×
//             </button>
//             <AuthForm onLogin={handleLogin} errorMessage={errorMessage} />
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./MainPageStart.module.css";

// export default function Home() {
//   const router = useRouter();

//   const [split, setSplit] = useState(false);
//   const [hideIntro, setHideIntro] = useState(false);

//   const hasFinishedRef = useRef(false);

//   const SPLIT_DURATION_MS = 2200;
//   const READING_DELAY_MS = 2000;

//   const finishIntro = (immediate: boolean = false) => {
//     if (hasFinishedRef.current) return;
//     hasFinishedRef.current = true;

//     const delay = immediate ? 0 : READING_DELAY_MS;

//     window.setTimeout(() => {
//       setSplit(true);

//       window.setTimeout(() => {
//         sessionStorage.setItem("introSeen", "true");
//         setHideIntro(true);

//         // переходим на настоящий сайт
//         router.push("/MainPage");
//       }, SPLIT_DURATION_MS);
//     }, delay);
//   };

//   useEffect(() => {
//     const wasSeen = sessionStorage.getItem("introSeen");
//     if (wasSeen === "true") {
//       // если интро уже было — сразу на сайт
//       router.replace("/MainPage");
//     }
//   }, [router]);

//   return (
//     <>
//       {!hideIntro && (
//         <div className={`${styles.intro} ${split ? styles.split : ""}`}>
//           <div className={styles.overlay} />

//           <div className={`${styles.half} ${styles.left}`}>
//             <video autoPlay loop muted playsInline className={styles.video}>
//               <source src="/img/titlevideo.mp4" type="video/mp4" />
//             </video>
//           </div>

//           <div className={`${styles.half} ${styles.right}`}>
//             <video autoPlay loop muted playsInline className={styles.video}>
//               <source src="/img/titlevideo.mp4" type="video/mp4" />
//             </video>
//           </div>

//           <div className={`${styles.textLayer} ${split ? styles.fadeOut : ""}`}>
//             <div className={styles.typewriter}>
//               <h1 className={styles.line1}>Мрії, що оживають у мандрах</h1>
//               <h3 className={styles.line2} onAnimationEnd={() => finishIntro(false)}>
//                 Авторські подорожі з душею та драйвом
//               </h3>
//             </div>

//             <button className={styles.skip} onClick={() => finishIntro(true)}>
//               Пропустити
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// "use client";

// import React from "react";
// // import { usePathname } from "next/navigation"; // Больше не нужно

// import MainPageLogo from "./MainPage/tsx/MainPageLogo";
// import MainPageMenu from "./MainPage/tsx/MainPageMenu";
// import MainPageFooter from "./MainPage/tsx/MainPageFooter";
// import styles from "./MainPage/css/MainPage.module.css";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   // Мы убрали проверку pathname, хедер и футер теперь есть всегда.
//   // Интро (черный экран) перекроет их при загрузке.

//   return (
//     <html lang="uk" suppressHydrationWarning>
//       <head>
//         <title>Мандроманія</title>
//         <meta name="description" content="Авторські тури" />
//       </head>

//       <body suppressHydrationWarning>
//         {/* Хедер выводим ВСЕГДА */}
//         <div className={styles.fixedHeader}>
//            <MainPageLogo />
//            <MainPageMenu />
//         </div>

//         <div className={styles.container}>
//           {/* Убрали лишние классы noPadding */}
//           <main className={styles.mainContent}>
//             {children}
//           </main>

//           {/* Футер выводим ВСЕГДА */}
//           <div className={styles.footerContent}>
//              <MainPageFooter />
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

import React from "react";
// Импортируем ваш основной компонент страницы
import MainPageContent from "./MainPage/page"; 

export default function Home() {
  return (
    // Просто выводим контент сайта.
    // Хедер и футер подключатся автоматически через layout.tsx
    <MainPageContent />
  );
}