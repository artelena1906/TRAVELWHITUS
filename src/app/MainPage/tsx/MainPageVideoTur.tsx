// import React, { useState, useEffect } from "react";
// import styles from "../css/MainPageVideoTur.module.css";

// interface Tour {
//   id: number;
//   urlvideo: string;
//   date: string;
//   name: string;
// }

// export default function MainPageVideoTur() {
//   const [tours, setTours] = useState<Tour[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const response = await fetch("/MainPageHeader.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         // Проверяем, что data.bodyData.tours существует и является массивом
//         if (data.bodyData && Array.isArray(data.bodyData.tours)) {
//           setTours(data.bodyData.tours);
//         } else {
//           throw new Error("Неверная структура данных в JSON");
//         }
//       } catch (error) {
//         console.error("Ошибка загрузки данных:", error);
//         setError("Не удалось загрузить данные. Попробуйте позже.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTours();
//   }, []);

//   // Отображаем состояние загрузки, ошибки или видео
//   if (isLoading) {
//     return <div>Загрузка...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className={styles.containerVideo}>
//       {tours.length > 0 ? (
//         <video autoPlay loop muted playsInline className={styles.video}>
//           <source src={tours[0].urlvideo} type="video/mp4" />
//           Ваш браузер не підтримує відео.
//         </video>
//       ) : (
//         <div>Видео не найдено</div>
//       )}
//     </div>
//   );
// }

'use client';
import React, { useState, useEffect } from "react";
import styles from "../css/MainPageVideoTur.module.css";

interface Tour {
  id: number;
  urlvideo: string;
  name: string;
}

interface BodyData {
  tours: Tour[];
}

interface JsonData {
  bodyData: BodyData;
}

export default function MainPageVideoTur() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных из JSON
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("/MainPageHeader.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: JsonData = await response.json();
        if (Array.isArray(data.bodyData.tours)) {
          // Берем последние 5 туров
          const lastFiveTours = data.bodyData.tours.slice(-5);
          setTours(lastFiveTours);
        } else {
          throw new Error("Неверная структура данных в JSON");
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setError("Не удалось загрузить данные. Попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Автоматическая смена слайдов каждые 5 секунд
  useEffect(() => {
    if (tours.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tours.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [tours]);

  // Обработчик клика по точке
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (tours.length === 0) {
    return <div>Видео не найдено</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.videoWrapper}>
        {tours.map((tour, index) => (
          <div
            key={tour.id}
            className={`${styles.videoSlide} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <video autoPlay loop muted playsInline className={styles.video}>
              <source src={tour.urlvideo} type="video/mp4" />
              Ваш браузер не підтримує відео.
            </video>
            {index === currentIndex && (
              <div
                key={`name-${currentIndex}`} // Уникальный ключ для перезапуска анимации
                className={styles.tourName}
              >
                {tour.name}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.dotsContainer}>
        {tours.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
