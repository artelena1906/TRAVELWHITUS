"use client";
import { useEffect, useState } from "react";
import styles from "./MainPageStart.module.css";
import AuthForm from "../components/AuthForm";
import { useRouter } from "next/navigation"; // Хук для навигации

export default function Home() {
  const [showText, setShowText] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter(); // Переместите сюда вызов хука

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 3000); // Текст через 3 секунды

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 9500); // Кнопка через 9.5 секунд

    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleOpenForm = (): void => setIsFormOpen(true);
  const handleCloseForm = (): void => setIsFormOpen(false);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token);
        handleCloseForm();

        // Переход на страницу /MainPage
        router.push("/MainPage"); // Используйте router.push() после успешного логина
      } else {
        setErrorMessage(data.message);
      }
    } catch {
      setErrorMessage("Что-то пошло не так, попробуйте снова.");
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.container}>
      <video autoPlay loop muted playsInline className={styles.video}>
        <source src="/img/titlevideo.mp4" type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>
      <div className={styles.overlay}></div>

      {showText && (
        <div className={styles.content}>
          <div className={styles.typewriter}>
            <h1>Мрії, що оживають у мандрах</h1>
            <h3>Авторські подорожі з душею та драйвом</h3>
          </div>
          {showButton && (
            <>
              {isLoggedIn ? (
                <button
                  className={`${styles.button} ${styles.show}`}
                  onClick={handleLogout}
                >
                  Вихід
                </button>
              ) : (
                <button
                  className={`${styles.button} ${styles.show}`}
                  onClick={handleOpenForm}
                >
                  Вхід
                </button>
              )}
            </>
          )}
        </div>
      )}

      {isFormOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseForm}>
              ×
            </button>
            <AuthForm onLogin={handleLogin} errorMessage={errorMessage} />
          </div>
        </div>
      )}
    </div>
  );
}
