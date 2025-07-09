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
    const jsonUrl = process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/MainPageHeader.json`
      : "/MainPageHeader.json";

    console.log("Попытка загрузки JSON с URL:", jsonUrl);

    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Не удалось загрузить JSON: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Полный JSON:", data);
        console.log("data.bodyData.tours[2].withus:", data.bodyData?.tours?.[2]?.withus);
        setWithus(data.bodyData?.tours?.[2]?.withus || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error.message);
        setError(error.message);
        setWithus([]);
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
