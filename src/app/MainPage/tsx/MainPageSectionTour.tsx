'use client';
import { useState, useEffect } from 'react';
import styles from '../css/MainPageSectionTour.module.css';
import Image from 'next/image';
import { Filters } from './MainPageSearch';
import { db } from '../../api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { DocumentData } from "firebase/firestore";

interface Tour {
  id: string;
  urlimage: string;
  date: string;
  month?: string;
  country?: string;
  name: string;
  sity?: string;
  description?: string;
  seats?: string;
  counter: number;
  price: number;
  continent?: string;
  tourTypes?: string[];
  typeID?: string;
}

interface MainPageSectionTourProps {
  filters?: Filters | null;
}

// функция парсинга "ДД.ММ.ГГГГ"
const parseDate = (dateStr: string): Date => {
  const [d, m, y] = dateStr.split('.').map(Number);
  return new Date(y, m - 1, d);
};

export default function MainPageSectionTour({ filters }: MainPageSectionTourProps) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'tours'));
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const arr: Tour[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          if (!data?.date) return;

          const dt = parseDate(data.date);
          if (dt >= today) {
            arr.push({
              id: doc.id,
              urlimage: data.urlimage || '',
              name: data.name || 'Без назви',
              sity: data.sity || '',
              country: data.country || '',
              continent: data.continent || '',
              month: data.month || '',
              typeID: data.typeID || '',
              date: data.date,
              counter: Number(data.counter) || 0,
              price: Number(data.price) || 0,
            });
          }
        });

        // сортировка по дате
        arr.sort(
          (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
        );

        const nearestTours = arr.slice(0, 3);

        setTours(nearestTours);

      } catch (e) {
        console.error('Ошибка загрузки туров:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (isLoading) return <p>Загрузка турів...</p>;
  if (!tours.length) return <p>Турів не знайдено</p>;

  // фильтрация
  const filteredTours = filters
    ? tours.filter((tour) => {
        if (filters.continent.length > 0 && !filters.continent.includes(tour.continent || '')) return false;
        if (filters.countries.length > 0 && !filters.countries.includes(tour.country || '')) return false;
        if (filters.months.length > 0 && (!tour.month || !filters.months.includes(tour.month))) return false;
        if (
          filters.tourTypes.length > 0 &&
          (!tour.typeID || !filters.tourTypes.includes(tour.typeID))
        )
          return false;
        const priceNumber = Number(tour.price);
        if (
          priceNumber < filters.priceRange[0] ||
          priceNumber > filters.priceRange[1]
        )
          return false;
        return true;
      })
    : tours;

  // return (
  //   <div className={styles.container}>
  //     <span className={styles.titleOne}>Актуальні тури</span>
  //     <div className={styles.header}>
  //     <h1 className={styles.title}>Куди їдемо далі?</h1>
  //     <Link href="/PageTours" className={styles.AllToursLink}>
  //       Переглянути всі тури
  //     </Link>
  //     </div>
  //     <div className={styles.toursContainer}>
  //       {filteredTours.length === 0 ? (
  //         <p>Турів не знайдено</p>
  //       ) : (
  //         filteredTours.map((tour) => (
  //           <Link key={tour.id} href={`/PageTours/${tour.id}`} className={styles.tourCard}>
  //             <div className={styles.tourMedia}>
  //               <Image
  //                 src={tour.urlimage}
  //                 alt={tour.name}
  //                 width={250}
  //                 height={150}
  //                 className={styles.tourImage}
  //                 priority={false}
  //               />
  //            </div>
  //             <div className={styles.tourInfo}>
  //               <span className={styles.tourName}>{tour.name}</span>
  //               <div className={styles.tourMeta}>
  //                 <span className={styles.tourDays}>
  //                   {tour.counter} днів
  //                 </span>
  //                 <span className={styles.tourDate}>
  //                   Початок подорожі: {tour.date}
  //                 </span>
  //                 <div className={styles.tourBottom}>
  //                   <span className={styles.tourPrice}>{tour.price} €</span>
  //                   <button className={styles.buttonBlog}>
  //                     Деталі пригоди
  //                   </button>
  //                 </div>
  //               </div>
  //             </div> 
  //           </Link>
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );


return (
  <div className={styles.container}>
    <span className={styles.titleOne}>Актуальні подорожі</span>
    <div className={styles.header}>
      <h1 className={styles.title}>Найближчі пригоди</h1>
      <Link href="/PageTours" className={styles.AllToursLink}>
        Переглянути всі тури
      </Link>
    </div>
    
    <div className={styles.toursContainer}>
  {filteredTours.length === 0 ? (
    <p>Турів не знайдено</p>
  ) : (
    filteredTours.map((tour) => (
      <Link key={tour.id} href={`/PageTours/${tour.id}`} className={styles.tourCard}>
        
        {/* Фотография + бейдж количества дней */}
        <div className={styles.tourMedia}>
          <Image
            src={tour.urlimage}
            alt={tour.name}
            width={400}
            height={250}
            className={styles.tourImage}
            priority={false}
          />
          {/* Плашка поверх фото */}
          <span className={styles.tourDaysBadge}>
            {tour.counter} днів
          </span>
        </div>

        {/* Текстовая информация */}
        <div className={styles.tourInfo}>
          <span className={styles.tourName}>{tour.name}</span>
          
          {/* Нижний ряд (Дата, Цена, Кнопка) */}
          <div className={styles.tourBottomRow}>
            
            {/* Дата подорожі с иконкой */}
            <div className={styles.tourDateWrapper}>
              <svg className={styles.calendarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className={styles.tourDate}>{tour.date}</span>
            </div>

            {/* Блок цены и круглой кнопки */}
            <div className={styles.priceAndAction}>
              <span className={styles.tourPrice}>
                <span className={styles.pricePrefix}></span> {tour.price} €
              </span>
              <div className={styles.circleArrowButton}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

          </div>
        </div> 

      </Link>
    ))
  )}
</div>
  </div>
);




}

