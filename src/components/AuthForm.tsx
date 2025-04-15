"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../app/MainPageStart.module.css";

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
  errorMessage?: string; // Зробимо errorMessage необов’язковим
}

export default function AuthForm({ onLogin, errorMessage }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter(); // Використовуємо useRouter напряму

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name); // Сохраняем имя
        onLogin(email, password);
        router.push("./MainPage"); // Перенаправлення після входу
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Щось пішло не так");
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const inviteCode = formData.get("inviteCode") as string;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, phone, email, password, inviteCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          router.push("./MainPage"); // Перенаправлення після реєстрації
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Щось пішло не так");
    }
  };

  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Увійти
        </button>
        <button
          className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Стати членом клубу
        </button>
      </div>

      {(message || errorMessage) && (
        <p
          className={
            message === "Ви успішно зареєстровані"
              ? styles.success
              : styles.error
          }
        >
          {message || errorMessage}
        </p>
      )}

      {activeTab === "login" ? (
        <form className={styles.form} onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="e-mail" required />
          <input type="password" name="password" placeholder="Пароль" required />
          <button type="submit">Увійти</button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Ім’я" required />
          <input type="text" name="surname" placeholder="Прізвище" required />
          <input type="tel" name="phone" placeholder="Номер телефону" required />
          <input type="email" name="email" placeholder="e-mail" required />
          <input type="password" name="password" placeholder="Пароль" required />
          <input type="text" name="inviteCode" placeholder="Код запрошення" required />
          <button type="submit">Зареєструватися</button>
        </form>
      )}
    </div>
  );
}