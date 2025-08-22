"use client";
import React, { useEffect, useState } from "react";
import styles from "../css/MainPage.module.css";

export default function GuestWarning() {
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "guest") {
      setIsGuest(true);
    }
  }, []);

  if (!isGuest) return null; // не показываем для user

  return (
    <div className={styles.guestWarning}>
      <span>⚠️ Ви зараз у режимі гостя. Деякі функції сайту недоступні. Зареєструйтесь або зв’яжіться з нами для повного доступу.</span>

    </div>
  );
}

