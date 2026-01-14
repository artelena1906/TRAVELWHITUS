
import styles from './PageToursIndividual.module.css';
import { FullTour } from "../../../types/tour";
import Image from "next/image";

interface PageTourScheduleProps {
  tour: FullTour;
}

export default function PageTourSchedule({ tour }: PageTourScheduleProps) {

  const formatDate = (dateString: string) => {
    if (!dateString) return ""; // Защита от пустой даты
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={styles.container}>
      {/* 1. ВЫВОД СПИСКА ДНЕЙ (МАРШРУТ) */}
      {tour.days.map((day, index) => (
        <div key={day.id || index}>
          <div className={styles.containerschedule}>
            <div className={styles.leftColumn}>
              <span className={styles.pDay}>День {day.dayNumber}</span>
              <div className={styles.date}>{formatDate(day.date)}</div>
            </div>

            <div className={styles.rightColumn}>
              {day.description
                .split("\n")
                .filter(p => p.trim() !== "")
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}

              {day.photos?.length > 0 && (
                <div className={styles.photos}>
                  {day.photos.map((photo, idx) => (
                    <Image
                      key={idx}
                      src={photo}
                      width={280}
                      height={210}
                      className={styles.dayImage}
                      alt={`Фото ${day.dayNumber}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {index < tour.days.length - 1 && (
            <hr className={styles.separator} />
          )}
        </div>
      ))}

      {/* --- ДОБАВЛЯЕМ "ЯКОРЬ" ДЛЯ СКРОЛЛА СЮДА --- */}
      {/* Сюда приедет экран при нажатии на "Деталі" */}
      <div id="section-details" style={{ scrollMarginTop: "180px" }}></div>

      {/* ВЫВОД БЛОКА ДЕТАЛЕЙ */}
      {/* Проверяем, есть ли вообще блок details или текстовое описание */}
      {(tour.textDetails || tour.details) && (
        <>
          <hr className={styles.separator} />

          {/*Текстовое описание (если есть) */}
          {tour.textDetails && (
            <div className={styles.detailsText} style={{ whiteSpace: 'pre-wrap', marginBottom: '30px' }}>
              {tour.textDetails}
            </div>
          )}

          {/* Структурированные детали (из объекта details) */}
          {tour.details && (
            <div className={styles.blockDetails}>

              {/* в цену входит */}
              {tour.details.includPrice && tour.details.includPrice.length > 0 && (
                 <div className={styles.containerDetails}>
                  <h4>У вартість включено:</h4>
                  <ul>
                    {tour.details.includPrice.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* в цену не входит */}
              {tour.details.notIncludPrice && tour.details.notIncludPrice.length > 0 && (
                 <div className={styles.containerDetails}>
                  <h4>У вартість не включено:</h4>
                  <ul>
                    {tour.details.notIncludPrice.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}


                {/* Формат путешествия */}
              {tour.details.formatTravel && tour.details.formatTravel.length > 0 && (
                <div className={styles.containerDetails}>
                  <h4> Формат подорожі:</h4>
                  <ul>
                    {tour.details.formatTravel.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Проживание */}
              {tour.details.accommodation && tour.details.accommodation.length > 0 && (
                <div className={styles.containerDetails}>
                  <h4>Проживання:</h4>
                  <ul>
                    {tour.details.accommodation.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

             {/* Важливо знати */}
              {tour.details.importantKnow && tour.details.importantKnow.length > 0 && (
                <div className={styles.containerDetails}>
                  <h4>Важливо знати:</h4>
                  <ul>
                    {tour.details.importantKnow.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Для кого цей маршрут */}
              {tour.details.route && tour.details.route.length > 0 && (
                <div className={styles.containerDetails}>
                  <h4>Для кого цей маршрут:</h4>
                  <ul>
                    {tour.details.route.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            
            </div>
          )}
        </>
      )}
    </div>
  );
}