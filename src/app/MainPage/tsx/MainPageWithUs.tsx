"use client";
import { useState, useEffect } from "react";
import styles from "../css/MainPageHeader.module.css";
import Image from "next/image";

interface WithUs {
  title: string;
  urlimage?: string;
}

export default function WhyWithUs() {
  const [withus, setWithus] = useState<WithUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
  fetch("/MainPageHeader.json")
    .then((res) => {
      if (!res.ok) throw new Error("Не удалось загрузить JSON");
      return res.json();
    })
    .then((data) => {
      console.log("Загруженные данные:", data);
      setWithus(data.bodyData.withus || []);
      setLoading(false); // <--- ОБЯЗАТЕЛЬНО
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных:", error);
      setError(error.message); // <--- ОБЯЗАТЕЛЬНО
      setLoading(false);
    });
}, []);

  if (loading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  if (error) {
    return <div className={styles.error}>Помилка: {error}</div>;
  }

  return (
    <div className={styles.containerWhyWithUs}>
      <h2 className={styles.title}>Чому саме з нами?</h2>
      <div className={styles.whyWithUsContainer}>
        {withus.length > 0 ? (
          withus.map((item, index) => (
            <div className={styles.whyWithUsItem} key={index}>
              {item.urlimage && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.urlimage}
                    alt={'image'}
                    width={100}
                    height={100}
                    className={styles.withusImage}
                  />
                </div>

              )}
              <h4 className={styles.whyWithUsTitle}>{item.title}</h4>
            </div>
          ))
        ) : (
          <p className={styles.noData}>Дані відсутні</p>
        )}
      </div>
    </div>
  );
}
