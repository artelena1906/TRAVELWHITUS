// "use client";
// import { useState, useEffect } from "react";
// import styles from "../css/MainPageHeader.module.css";

// export default function WithUs() {
//     interface WithUs {
//         title: string;
//         description: string;
//         url?: string; // Добавляем опциональное поле url
//     }

//     const [withus, setwithus] = useState<WithUs[] | null>(null); // Изначально null вместо пустого массива
//     const [loading, setLoading] = useState(true); // Состояние загрузки

//     useEffect(() => {
//         fetch("/MainPageHeader.json")
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data); // Для отладки
//                 setwithus(data.bodyData.withus || []); // Устанавливаем пустой массив, если withus отсутствует
//                 setLoading(false); // Завершаем загрузку
//             })
//             .catch((error) => {
//                 console.error("Ошибка загрузки данных:", error);
//                 setwithus([]); // Устанавливаем пустой массив при ошибке
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div>Завантаження...</div>;
//     }

//     return (
//         <div className={styles.containerWithUs}>
//             <h3>Чому саме з нами?</h3>
//             <div className={styles.withuscontainer}>
//                 {withus && withus.length > 0 ? (
//                     withus.map((item, index) => (
//                         <div className={styles.withusitem} key={index}>
//                             <h4>{item.title}</h4>
//                         </div>
//                     ))
//                 ) : (
//                     <p></p>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";
import { useState, useEffect } from "react";
import styles from "../css/MainPageHeader.module.css";

interface WithUs {
  title: string;
  urlimage?: string;
}

export default function WhyWithUs() {
  const [withus, setWithus] = useState<WithUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const jsonUrl = process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/MainPageHeader.json`
      : "/MainPageHeader.json";

    console.log("Попытка загрузки JSON с URL:", jsonUrl);

    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Не удалось загрузить JSON: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Полный JSON:", data);
        console.log("data.bodyData.tours[2].withus:", data.bodyData?.tours?.[2]?.withus);
        setWithus(data.bodyData?.tours?.[2]?.withus || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error.message);
        setError(error.message);
        setWithus([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  if (error) {
    return <div className={styles.error}>Помилка: {error}</div>;
  }

  return (
    <div className={styles.containerWhyWithUs}>
      <h3 className={styles.title}>Чому саме з нами?</h3>
      <div className={styles.whyWithUsContainer}>
        {withus.length > 0 ? (
          withus.map((item, index) => (
            <div className={styles.whyWithUsItem} key={index}>
              <h4 className={styles.whyWithUsTitle}>{item.title}</h4>
            </div>
          ))
        ) : (
          <p className={styles.noData}>Дані відсутні</p>
        )}
      </div>
    </div>
  );
}