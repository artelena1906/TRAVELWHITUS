"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../api/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import styles from "../css/CountryPicture.module.css";

interface Country {
  id: string;
  name: string;
  urlimage: string;
}

export default function CountryPicture() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const docRef = doc(db, "country", "countryMap");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const rawData = docSnap.data().country;

          if (Array.isArray(rawData)) {
            // Оскільки тепер усі елементи є однаковими об'єктами:
            const formattedCountries: Country[] = rawData.map((item: Country) => ({
              id: item.id,
              name: item.name,
              urlimage: item.urlimage && item.urlimage.trim() !== "" 
                ? item.urlimage 
                : "/images/placeholder.jpg", // Резервне фото, якщо urlimage порожнє ""
            }));

            setCountries(formattedCountries);
          }
        }
      } catch (error) {
        console.error("Помилка при отриманні даних з Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Розрахунок асиметричної сітки (2 / 3 / 3 / 2)
 const getGridClass = (index: number) => {
  const position = index % 11; // Повний цикл з 11 країн

  switch (position) {
    // Рядок 1 (2 блоки)
    case 0:
      return styles.row1_col1;
    case 1:
      return styles.row1_col2;

    // Рядок 2 (3 блоки)
    case 2:
      return styles.row2_col1;
    case 3:
      return styles.row2_col2;
    case 4:
      return styles.row2_col3;

    // Рядок 3 (3 блоки)
    case 5:
      return styles.row3_col1;
    case 6:
      return styles.row3_col2;
    case 7:
      return styles.row3_col3;

    // Рядок 4 (3 блоки)
    case 8:
      return styles.row4_col1;
    case 9:
      return styles.row4_col2;
    case 10:
      return styles.row4_col3;

    default:
      return styles.row1_col1;
  }
};

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Завантаження країн...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.countryGrid}>
        {countries.map((country, index) => (
          <Link
            key={country.id}
            href={`/PageCountryIndividual/${country.id}`}
            className={`${styles.card} ${getGridClass(index)}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={country.urlimage}
                alt={country.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.cardImage}
                priority={index < 4}
              />
              <div className={styles.overlay}></div>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.countryName}>{country.name}</h3>
              <div className={styles.arrowIcon}>
               <svg
  width="26"
  height="26"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="3"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M4 12h13" />
  <path d="M12 6l6 6-6 6" />
</svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}