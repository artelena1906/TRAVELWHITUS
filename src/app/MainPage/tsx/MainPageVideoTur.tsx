'use client';
import React, { useState, useEffect } from "react";
import styles from "../css/MainPageVideoTur.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase";
import Skeleton from '../../../components/Skeleton/Skeleton';
import Link from 'next/link';

interface Tour {
  id: string;
  urlvideo: string;
  name: string;
}

// функция парсинга "ДД.ММ.ГГГГ"
const parseDate = (dateStr: string): Date => {
  const [d, m, y] = dateStr.split('.').map(Number);
  return new Date(y, m - 1, d);
};

export default function MainPageVideoTur() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tours"));
        const fetchedTours: Tour[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (!data?.date) return;
 const dt = parseDate(data.date);
if (dt >= today) {
          fetchedTours.push({
            id: doc.id,
            urlvideo: data.urlvideo,
            name: data.name,
          });
        }});

        // берем последние 5 туров
        const lastFiveTours = fetchedTours.slice(-5);
        setTours(lastFiveTours);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError("Не удалось загрузить данные. Попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Авто-слайд каждые 6 секунд
  useEffect(() => {
    if (tours.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tours.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [tours]);

  const handleDotClick = (index: number) => setCurrentIndex(index);

  if (isLoading) {
  // Замість тексту показуємо сірий прямокутник
  return <Skeleton height="40px" width="60%" />;
}

  if (error) return <div>{error}</div>;
  if (tours.length === 0) return <div>Видео не найдено</div>;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.videoWrapper}>
        {tours.map((tour, index) => (
          <Link key={tour.id} href={`/PageTours/${tour.id}`}
            className={`${styles.videoSlide} ${index === currentIndex ? styles.active : ""}`}
          >
            <video autoPlay loop muted playsInline className={styles.video}>
              <source src={tour.urlvideo} type="video/mp4" />
              Ваш браузер не підтримує відео.
            </video>
            {index === currentIndex && (
              <div
                key={`name-${currentIndex}`}
                className={styles.tourName}
              >
                {tour.name}
              </div>
            )}
          </Link>
        ))}
      </div>
      <div className={styles.dotsContainer}>
        {tours.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
