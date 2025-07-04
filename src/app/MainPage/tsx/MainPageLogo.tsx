"use client";
import React, { useState, useEffect } from "react";
import styles from "../css/MainPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../../api/firebase"; 
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function MainPageLogo() {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserName(user.displayName || localStorage.getItem("name") || "Користувач");
        localStorage.setItem("token", user.uid);
        localStorage.setItem("name", user.displayName || "");
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      router.push("/");
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.spacer}></div>
      <div className={styles.logoContainer}>
        <Link prefetch={true} href="./MainPage">
          <Image
            src="/img/logo2.png"
            alt="Логотип"
            width={400}
            height={100}
            className={styles.logo}
          />
        </Link>
      </div>
      <div className={styles.userSection}>
        <span>Привіт, {userName}</span>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Вихід
        </button>
      </div>
    </div>
  );
}
