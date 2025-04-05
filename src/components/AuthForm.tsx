"use client";

import { useState } from "react";
import styles from "../app/MainPageStart.module.css";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Війти
        </button>
        <button
          className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Стати членом клубу
        </button>
      </div>

      {activeTab === "login" ? (
        <form className={styles.form}>
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Пароль" required />
          <button type="submit">Війти</button>
        </form>
      ) : (
        <form className={styles.form}>
          <input type="text" placeholder="Ім’я" required />
          <input type="text" placeholder="Прізвище" required />
          <input type="tel" placeholder="Номер телефону" required />
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Пароль" required />
          <input type="text" placeholder="Код запрошення" required />
          <button type="submit">Зареєструватися</button>
        </form>
      )}
    </div>
  );
}