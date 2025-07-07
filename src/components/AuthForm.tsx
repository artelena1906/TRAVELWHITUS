"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../app/api/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import styles from "../app/MainPageStart.module.css";

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
  errorMessage?: string;
}

export default function AuthForm({ onLogin, errorMessage }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Сброс значений input при смене вкладки
  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  }, [activeTab]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem("token", user.uid);
      localStorage.setItem("name", user.displayName || email.split("@")[0]);
      onLogin(email, password);
      router.push("/MainPage");
    } catch {
      setMessage("Неправильний email або пароль");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const surname = formData.get("surname")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const inviteCode = formData.get("inviteCode")?.toString() || "";

    try {
      const inviteRef = doc(db, "invites", inviteCode);
      const inviteDoc = await getDoc(inviteRef);

      if (!inviteDoc.exists() || inviteDoc.data()?.used === true) {
        setMessage("Недійсний або використаний код запрошення");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${name} ${surname}`,
      });

      await setDoc(inviteRef, { used: true, usedAt: new Date().toISOString() }, { merge: true });

      await setDoc(doc(db, "users", user.uid), {
        name,
        surname,
        phone,
        email,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("token", user.uid);
      localStorage.setItem("name", `${name} ${surname}`);
      setMessage("Ви успішно зареєстровані");

      setTimeout(() => {
        router.push("/MainPage");
      }, 2000);
    } catch (error: unknown) {
      const err = error as Error;
      setMessage("Помилка при реєстрації: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
          onClick={() => {
            setActiveTab("login");
            setMessage(null);
          }}
          disabled={loading}
        >
          Увійти
        </button>
        <button
          className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
          onClick={() => {
            setActiveTab("register");
            setMessage(null);
          }}
          disabled={loading}
        >
          Зареєструватися
        </button>
      </div>

      {(message || errorMessage) && (
        <p className={message === "Ви успішно зареєстровані" ? styles.success : styles.error}>
          {message || errorMessage}
        </p>
      )}

      {activeTab === "login" ? (
        <form className={styles.form} onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            required
            disabled={loading}
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            required
            disabled={loading}
            autoComplete="current-password"
          />
          <button type="submit" disabled={loading}>Увійти</button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleRegister} autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Ім’я"
            required
            disabled={loading}
            autoComplete="off"
          />
          <input
            type="text"
            name="surname"
            placeholder="Прізвище"
            required
            disabled={loading}
            autoComplete="off"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефону"
            required
            disabled={loading}
            autoComplete="tel"
          />
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            required
            disabled={loading}
            autoComplete="new-email"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            required
            disabled={loading}
            autoComplete="new-password"
          />
          <input
            type="text"
            name="inviteCode"
            placeholder="Код запрошення"
            required
            disabled={loading}
            autoComplete="off"
          />
          <button type="submit" disabled={loading}>Зареєструватися</button>
        </form>
      )}
    </div>
  );
}
