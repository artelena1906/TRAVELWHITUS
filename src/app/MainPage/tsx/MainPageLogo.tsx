"use client";
import React, { useState, useEffect } from "react";
import styles from "../css/MainPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainPageLogo() {
  const [userName, setUserName] = useState<string>(""); // Имя из localStorage
  const router = useRouter();

  // Загружаем имя из localStorage при монтировании компонента
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    } else {
      // Перенаправляем на страницу входа, если имя отсутствует
      router.push("/");
    }
  }, [router]);

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен
    localStorage.removeItem("name"); // Удаляем имя
    router.push("/"); // Перенаправляем на стартовую страницу
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.spacer}></div> {/* Пустой блок для баланса слева */}
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