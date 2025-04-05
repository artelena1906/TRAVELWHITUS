"use client";

import { useEffect, useState } from "react";
import styles from "./MainPageStart.module.css";
import AuthForm from "../components/AuthForm";

export default function Home() {
  const [showText, setShowText] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 3000); // Текст через 3 секунди

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
            <h1>Коло обраних: подорожі для своїх</h1>
            <h3>Приватний світ: лише для членів клубу за запрошенням</h3>
          </div>
          {showButton && (
            <button
              className={`${styles.button} ${styles.show}`}
              onClick={handleOpenForm}
            >
              Вхід
            </button>
          )}
        </div>
      )}

      {isFormOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseForm}>
              ×
            </button>
            <AuthForm />
          </div>
        </div>
      )}
    </div>
  );
}