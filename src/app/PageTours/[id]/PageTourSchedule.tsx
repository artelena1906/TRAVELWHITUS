import React from "react";
import styles from './PageToursIndividual.module.css';
import { FullTour } from "../../../types/tour";
import Image from "next/image";

interface PageTourScheduleProps {
  tour: FullTour;
}

export default function PageTourSchedule({ tour }: PageTourScheduleProps) {
  return (
    <div className={styles.container}>
      {tour.days.map((day, index) => (
        <div key={day.id}>
          <div className={styles.containerschedule}>
            <div className={styles.leftColumn}>
              <span className={styles.pDay}>День {day.dayNumber}</span>
              <div className={styles.date}>{day.date}</div>
            </div>
            <div className={styles.rightColumn}>
              {day.description
                .split("\n")
                .filter(p => p.trim() !== "")
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>
          </div>

          {day.photos.length > 0 && (
            <div className={styles.photos}>
              {day.photos.map((photo, idx) => (
                <Image
                  key={idx}
                  src={photo}
                  width={280}
                  height={180}
                  className={styles.dayImage}
                  priority={false}
                  alt={`Фото ${day.dayNumber}`}
                />
              ))}
            </div>
          )}

          {/* Горизонтальная линия отдельно от flex-контейнера */}
          {index < tour.days.length - 1 && (
            <hr className={styles.separator} />
          )}
        </div>
      ))}
    </div>
  );
}
