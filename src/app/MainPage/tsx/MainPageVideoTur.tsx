'use client';
import React, { useState, useEffect, useRef } from "react";
import styles from "../css/MainPageVideoTur.module.css";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../api/firebase";
import Skeleton from '../../../components/Skeleton/Skeleton';
import Link from 'next/link';

export default function MainPageVideoTur() {
  const [videos, setVideos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Массив рефов для контроля каждого видеоплеера напрямую
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const docRef = doc(db, "main_videos", "Videos");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (Array.isArray(data?.video)) {
            setVideos(data.video);
          } else {
            setError("Поле 'video' не знайдено.");
          }
        } else {
          setError("Документ 'Videos' не знайдено.");
        }
      } catch (err) {
        console.error("Помилка завантаження:", err);
        setError("Не вдалося завантажити фонове відео.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Авто-слайд кожні 6 секунд
  useEffect(() => {
    if (videos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [videos]);

  // Принудительный запуск видео при смене слайда (лечит баг черного экрана в Safari и Chrome)
  useEffect(() => {
    if (videoRefs.current[currentIndex]) {
      const activeVideo = videoRefs.current[currentIndex];
      activeVideo.muted = true; // Жестко включаем mute в коде
      activeVideo.play().catch((err) => {
        console.log("Автозапуск заблокирован браузером, пробуем снова:", err);
      });
    }
  }, [currentIndex, videos]);

  if (isLoading) {
    return <Skeleton height="80vh" width="100%" />;
  }

  if (error || videos.length === 0) {
    return (
      <div className={styles.carouselContainer}>
        <div className={styles.videoWrapper} style={{ backgroundColor: '#1a1a1a' }} />
        <StaticOverlay />
      </div>
    );
  }

  return (
    <div className={styles.carouselContainer}>
      {/* Задній фон */}
      <div className={styles.videoWrapper}>
        {videos.map((videoUrl, index) => (
          <div
            key={index}
            className={`${styles.videoSlide} ${index === currentIndex ? styles.active : ""}`}
          >
            <video 
              ref={(el) => { if (el) videoRefs.current[index] = el; }} // сохраняем ссылку на плеер
              autoPlay 
              loop 
              muted // для HTML
              playsInline 
              className={styles.video}
              preload="auto"
            >
              <source src={videoUrl} type="video/mp4" />
              Ваш браузер не підтримує відео.
            </video>
          </div>
        ))}
      </div>

      {/* Передній план */}
      <StaticOverlay />
    </div>
  );
}

function StaticOverlay() {
  return (
    <div className={styles.overlayContent}>
      <span className={styles.subtitle}>Авторські подорожі</span>
      <h1 className={styles.title}>
        Подорожі, що<br />залишають слід<br />у серці
      </h1>
      <p className={styles.description}>
        Ми створюємо маршрути для тих, хто хоче більше, <br />ніж просто побачити країну. 
        <br />Відкривайте світ глибше разом з Мандроманією.
      </p>
      <Link href="/PageTours" className={styles.ctaButton}>
        Обрати пригоду
      </Link>
    </div>
  );
}