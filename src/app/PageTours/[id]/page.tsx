'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../../firebase';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import styles from './PageToursIndividual.module.css';
import PageTourSchedule from './PageTourSchedule';
import { FullTour, TourDay } from '../../../types/tour';

export default function TourIndividual() {
  const params = useParams();
  const id = params?.id; // получаем id из URL
  const [tour, setTour] = useState<FullTour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchTour = async () => {
      try {
        const docRef = doc(db, 'tours', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;

          // Приведение данных к FullTour
          const days: TourDay[] = (data.days || []).map((d: any, index: number) => ({
            id: d.id || `${index + 1}`,
            dayNumber: d.dayNumber || index + 1,
            date: d.date || '',
            description: d.description || '',
            photos: d.photos || [],
          }));

          setTour({
            id: docSnap.id,
            name: data.name || 'Без назви',
            country: data.country || '',
            countryDescription: data.countryDescription || '',
            sity: data.sity || '',
            date: data.date || '',
            price: data.price || 0,
            seats: data.seats || '',
            description: data.description || '',
            urlimage: data.urlimage || '',
            urlvideo: data.urlvideo || '',
            continent: data.continent || '',
            month: data.month || '',
            typeID: data.typeID || '',
            activity: data.activity ?? true,
            counter: data.counter ?? 0,
            days,
          });
        } else {
          setTour(null);
        }
      } catch (err) {
        console.error('Ошибка загрузки тура:', err);
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <p>Завантаження...</p>;
  if (!tour) return <p>Тур не знайдено</p>;

  return (
    <div className={styles.container}>
      {/* Hero Image */}
      {tour.urlimage && (
        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${tour.urlimage})` }}
        >
          <div className={styles.heroTitle}>{tour.country}</div>
          <div className={styles.details}>
            {tour.date} | € {tour.price}
          </div>
          <div className={styles.details1}>{tour.seats}</div>
          <div className={styles.Button}>
            <button className={styles.bookButton}>Хочу у подорож</button>
          </div>
        </div>
      )}

      <div className={styles.description}>
        <div className={styles.leftContainer}>
          <nav className={styles.leftMenu}>
            <ul>
              <li>
                <a href="/" className={styles.breadcrumbLink}>
                  Про подорож
                </a>
              </li>
              <li>
                <a href="/" className={styles.breadcrumbLink}>
                  Опис маршруту
                </a>
              </li>
              <li>
                <a href="/" className={styles.breadcrumbLink}>
                  Деталі
                </a>
              </li>
              <li>
                <a href="/" className={styles.breadcrumbLink}>
                  Відгуки
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.rightContainer}>
          <h2 className={styles.tourName}>{tour.name}</h2>
          <p className={styles.countryText}>{tour.countryDescription}</p>

          {/* Передаем тур в PageTourSchedule */}
          <PageTourSchedule tour={tour} />
        </div>
      </div>
    </div>
  );
}
