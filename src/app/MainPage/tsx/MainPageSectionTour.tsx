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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Найближчі тури</h1>
      <div className={styles.toursContainer}>
        {filteredTours.length === 0 ? (
          <p>Турів не знайдено</p>
        ) : (
          filteredTours.map((tour) => (
            <Link key={tour.id} href={`/PageTours/${tour.id}`} className={styles.tourCard}>
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
                {tour.sity && <p className={styles.tourCities}>{tour.sity}</p>}
                <div className={styles.tourDetails}>
                  <span className={styles.tourDays}>
                    {/* Кількість днів: */}
                    {tour.counter} днів
                  </span>
                  <span className={styles.tourDate}>
                    Початок подорожі: {tour.date}
                  </span>
                  <span className={styles.tourPrice}>Ціна: {tour.price} €</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <Link href="/PageTours" className={styles.linkBlog}>
           <button className={styles.buttonBlog}>Календар подорожей</button>
        </Link>
    </div>
  );
}

