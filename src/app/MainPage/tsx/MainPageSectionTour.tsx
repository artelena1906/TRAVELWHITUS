// "use client";
// import { useState, useEffect } from "react";
// import styles from "../css/MainPageSectionTour.module.css";
// import Image from "next/image";

// interface Tour {
//   id: number;
//   urlimage: string;
//   date: string;
//   country: string;
//   name: string;
//   sity: string;
//   description: string;
//   seats: string;
//   counter: string;
//   price: string;
// }

// export default function MainPageSectionTour() {
//   const [tours, setTours] = useState<Tour[]>([]);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true); // Устанавливаем флаг после монтирования
//     fetch("/MainPageHeader.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch JSON");
//         return res.json();
//       })
//       .then((data) => {
//         setTours(data.bodyData.tours);
//       })
//       .catch((error) => console.error("Ошибка загрузки данных:", error));
//   }, []);

//   if (!isMounted) {
//     return null; // Ничего не рендерим на сервере
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Найближчі тури</h1>
//       <div className={styles.toursContainer}>
//         {tours.length === 0 ? (
//           <p>Завантаження...</p>
//         ) : (
//           tours.map((tour) => (
//             <div key={tour.id} className={styles.tourCard}>
//               <div className={styles.tourMedia}>
//                 <Image
//                   src={tour.urlimage}
//                   alt={tour.name}
//                   width={300}
//                   height={200}
//                   className={styles.tourImage}
//                 />
//               </div>
//               <div className={styles.tourInfo}>
//                 <h3 className={styles.tourName}>{tour.name}</h3>
//                 <p className={styles.tourCities}>{tour.sity}</p>
//                 <div className={styles.tourDetails}>
//                   <span className={styles.tourDate}>Початок мандрівки: {tour.date}</span>
//                   <span className={styles.tourDays}>Кількість днів: {tour.counter} днів</span>
//                   <span className={styles.tourPrice}> Ціна: {tour.price} € </span>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import styles from '../css/MainPageSectionTour.module.css';
import Image from 'next/image';
import { Filters } from './MainPageSearch';

interface Tour {
  id: number;
  urlimage: string;
  date: string;
  country: string;
  name: string;
  sity: string;
  description: string;
  seats: string;
  counter: string;
  price: string;
  continent: string;
  tourTypes?: string[];
}

interface MainPageSectionTourProps {
  filters?: Filters | null;
}

export default function MainPageSectionTour({ filters }: MainPageSectionTourProps) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch('/MainPageHeader.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch JSON');
        return res.json();
      })
      .then(data => {
        // Предполагается, что данные в data.bodyData.tours
        setTours(data.bodyData.tours);
      })
      .catch(err => {
        console.error('Ошибка загрузки данных:', err);
      });
  }, []);

  if (!isMounted) return null;

  // Если фильтры есть — фильтруем туры
  const filteredTours = filters
    ? tours.filter(tour => {
        // Континент
        if (filters.continent.length > 0 && !filters.continent.includes(tour.continent)) return false;
        // Страна
        if (filters.countries.length > 0 && !filters.countries.includes(tour.country)) return false;
        // Тип тура
        if (
          filters.tourTypes.length > 0 &&
          (!tour.tourTypes || !tour.tourTypes.some(type => filters.tourTypes.includes(type)))
        )
          return false;
        // Цена
        const priceNumber = Number(tour.price);
        if (priceNumber < filters.priceRange[0] || priceNumber > filters.priceRange[1]) return false;

        // Можно добавить фильтр по месяцам, если нужно, исходя из даты тура

        return true;
      })
    : tours;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Найближчі тури</h1>
      <div className={styles.toursContainer}>
        {filteredTours.length === 0 ? (
          <p>Турів не знайдено</p>
        ) : (
          filteredTours.map(tour => (
            <div key={tour.id} className={styles.tourCard}>
              <div className={styles.tourMedia}>
                <Image
                  src={tour.urlimage}
                  alt={tour.name}
                  width={300}
                  height={200}
                  className={styles.tourImage}
                  priority={false}
                />
              </div>
              <div className={styles.tourInfo}>
                <h3 className={styles.tourName}>{tour.name}</h3>
                <p className={styles.tourCities}>{tour.sity}</p>
                <div className={styles.tourDetails}>
                  <span className={styles.tourDate}>Початок мандрівки: {tour.date}</span>
                  <span className={styles.tourDays}>Кількість днів: {tour.counter} днів</span>
                  <span className={styles.tourPrice}>Ціна: {tour.price} €</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
