'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../../firebase';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import styles from './PageToursIndividual.module.css';
import PageTourSchedule from './PageTourSchedule';
import { FullTour, TourDay } from '../../../types/tour';
import Link from 'next/link';

export default function TourIndividual() {
  const params = useParams();
  const id = params?.id; // получаем id из URL
  const [tour, setTour] = useState<FullTour | null>(null);
  const [loading, setLoading] = useState(true);

  // --- ФУНКЦИЯ ДЛЯ ПЛАВНОГО СКРОЛЛА ---
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    const element = document.getElementById(targetId);
    if (element) {
      // Высота вашего хедера (150px) + небольшой отступ (например, 20px)
      const headerOffset = 170; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchTour = async () => {
      try {
        const docRef = doc(db, 'tours', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;

          const days: TourDay[] = (data.days || []).map((d: Partial<TourDay>, index: number) => ({
            id: d.id ?? `${index + 1}`,
            dayNumber: d.dayNumber ?? index + 1,
            date: d.date ?? '',
            description: d.description ?? '',
            photos: d.photos ?? [],
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
            textDetails: data.textDetails || '',
            details: data.details || null,
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

//   return (
//     <div className={styles.container}>
//       {/* Hero Image */}
//       {tour.urlimage && (
//         <div
//           className={styles.hero}
//           style={{ backgroundImage: `url(${tour.urlimage})` }}
//         >
//           <div className={styles.heroTitle}>{tour.country}</div>
//           <div className={styles.details}>
//             {tour.date} | € {tour.price}
//           </div>
//           <div className={styles.details1}>{tour.seats}</div>
//           <div className={styles.Button}>
//             <button className={styles.bookButton}>Хочу у подорож</button>
//           </div>
//         </div>
//       )}

//       <div className={styles.description}>
//         <div className={styles.leftContainer}>
//           <nav className={styles.leftMenu}>
//             <ul>
//               <li>
//                 <Link href="/" className={styles.breadcrumbLink}>
//                   Про подорож
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/" className={styles.breadcrumbLink}>
//                   Опис маршруту
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/" className={styles.breadcrumbLink}>
//                   Деталі
//                 </Link>
//               </li>
//               {/* <li>
//                 <Link href="/" className={styles.breadcrumbLink}>
//                   Відгуки
//                 </Link>
//               </li> */}
//             </ul>
//           </nav>
//         </div>

//         <div className={styles.rightContainer}>
//           <h2 className={styles.tourName}>{tour.name}</h2>
//           <p className={styles.countryText}>{tour.countryDescription}</p>

//           {/* Передаем тур в PageTourSchedule */}
//           <PageTourSchedule tour={tour} />
//         </div>
//       </div>
//     </div>
//   );
// }

return (
    <div className={styles.container}>
      {/* 1. ID ДЛЯ СЕКЦИИ "ПРО ПОДОРОЖ" (ВЕРХ СТРАНИЦЫ) */}
      <div id="section-about"> 
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
      </div>

      <div className={styles.description}>
        <div className={styles.leftContainer}>
          <nav className={styles.leftMenu}>
            <ul>
              <li>
                {/* ССЫЛКА 1: Про подорож */}
                <Link 
                  href="#section-about" 
                  className={styles.breadcrumbLink}
                  onClick={(e) => handleScroll(e, 'section-about')}
                >
                  Про подорож
                </Link>
              </li>
              <li>
                {/* ССЫЛКА 2: Опис маршруту */}
                <Link 
                  href="#section-description" 
                  className={styles.breadcrumbLink}
                  onClick={(e) => handleScroll(e, 'section-description')}
                >
                  Опис маршруту
                </Link>
              </li>
              <li>
                {/* ССЫЛКА 3: Деталі */}
                <Link 
                  href="#section-details" 
                  className={styles.breadcrumbLink}
                  onClick={(e) => handleScroll(e, 'section-details')}
                >
                  Деталі
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.rightContainer}>
          {/* 2. ID ДЛЯ СЕКЦИИ "ОПИС МАРШРУТУ" */}
          <h2 id="section-description" className={styles.tourName}>
            {tour.name}
          </h2>
          
          <p className={styles.countryText}>{tour.countryDescription}</p>

          <PageTourSchedule tour={tour} />
        </div>
      </div>
    </div>
  );
}