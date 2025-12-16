"use client";
import React, { useState, useEffect } from "react";
import styles from "../css/MainPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { auth } from "../../api/firebase";
// import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function MainPageLogo() {
  // const [userName, setUserName] = useState<string>("Гість");
  const [role, setRole] = useState<string>("guest"); // "user" или "guest"
  const router = useRouter();

  // useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      // const storedRole = localStorage.getItem("role");
      // const storedName = localStorage.getItem("name") || "Гість";

    //   if (user) {
    //     const fullName = user.displayName || storedName;
    //     const firstName = fullName.split(" ")[0];
    //     setUserName(firstName);
    //     setRole("user");
    //     localStorage.setItem("token", user.uid);
    //     localStorage.setItem("name", fullName);
    //     localStorage.setItem("role", "user");
    //   } else if (storedRole === "guest") {
    //     setUserName(storedName);
    //     setRole("guest");
    //   } else {
    //     router.push("/");
    //   }
    // });

  //   return () => unsubscribe();
  // }, [router]);

  // const handleLogout = async () => {
  //   try {
  //     if (role === "user") {
  //       await signOut(auth);
  //     }
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("name");
  //     localStorage.removeItem("role");
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Помилка при виході:", error);
  //   }
  // };

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.spacer}></div>

        <div className={styles.logoContainer}>
          <Link prefetch={true} href="/MainPage">
            <Image
              src="/img/logo2.png"
              alt="Логотип"
              width={400}
              height={100}
              className={styles.logo}
            />
          </Link>
        </div>

        {/* <div className={styles.userSection}>
          <span>Привіт, {userName}</span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <div className={styles.logoutIcon}>
              <Image
                src="/img/logout.png"
                alt="Вихід"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 600px) 18px, 24px"
              />
            </div>
          </button>
        </div> */}
      </div>
    </>
  );
}
