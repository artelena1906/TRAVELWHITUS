// "use client";
// import { useState, useEffect } from "react";
// import styles from "../css/PageCountryIndividual.module.css";
// import Image from "next/image";
// import { useParams} from "next/navigation";
// // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

// export default function PageCountryIndividual() {
//     interface ImageItem {
//         url: string;
//         alt: string;
//     }

//     interface TextSection {
//         title: string | null;
//         description: string;
//     }

//     interface Country {
//         id: number;
//         text: TextSection[];
//         name: string;
//         alt: string;
//         imgmap: string;
//         image?: ImageItem[];
//     }

//     interface Tour {
//         id: string;
//         date: string;
//         country?: string;
//         name: string;
//         sity: string;
//         description: string;
//         seats: string;
//         provider: string;
//     }

//     const [countryData, setCountryData] = useState<Country | null>(null);
//     // const [tours, setTours] = useState<Tour[]>([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const params = useParams();
//     // const router = useRouter();
//     const countryId = params?.id;

//     useEffect(() => {
//         if (!countryId) return;

//         fetch("/MainPageHeader.json")
//             .then((res) => res.json())
//             .then((data) => {
//                 const selectedCountry = data.bodyData.country.find(
//                     (c: Country) => c.id.toString() === countryId
//                 );
//                 if (selectedCountry) {
//                     setCountryData(selectedCountry);
//                     const filteredTours = data.bodyData.tours.filter((tour: Tour) =>
//                         tour.country && tour.country.toLowerCase() === selectedCountry.name.toLowerCase()
//                     );
//                     // setTours(filteredTours);
//                 } else {
//                     console.error(`Страна с id ${countryId} не найдена`);
//                 }
//             })
//             .catch((error) => console.error("Ошибка загрузки данных:", error));
//     }, [countryId]);

//     const handleImageClick = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     // const handleTourClick = (tourId: string) => {
//     //     router.push(`/PageTourIndividual/${tourId}`);
//     // };

//     if (!countryData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className={styles.container}>
//             <h1>{countryData.name}</h1>
//             {/* Основной текст с обтеканием изображения */}
//             {countryData.text && countryData.text.length > 0 && (
//                 <div className={styles.textSection}>
//                     <Image
//                         src={countryData.imgmap}
//                         alt={countryData.alt}
//                         width={450}
//                         height={250}
//                         className={styles.mapImage}
//                         onClick={handleImageClick}
//                         style={{ cursor: "pointer" }}
//                     />
//                     {countryData.text.slice(0).map((section, index) => (
//                         <div key={index} className={styles.textBlock}>
//                             <h2>{section.title}</h2>
//                             <p>{section.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Галерея изображений */}
//             {countryData.image && countryData.image.length > 0 && (
//                 <div className={styles.imageGallery}>
//                     {countryData.image.map((img, index) => (
//                         <Image
//                             key={index}
//                             src={img.url}
//                             alt={img.alt}
//                             width={200}
//                             height={200}
//                             className={styles.galleryImage}
//                         />
//                     ))}
//                 </div>
//             )}

//             {/* Модальное окно */}
//             {isModalOpen && (
//                 <div className={styles.modalOverlay} onClick={handleCloseModal}>
//                     <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//                         <Image
//                             src={countryData.imgmap}
//                             alt={countryData.alt}
//                             width={1000}
//                             height={600}
//                             className={styles.modalImage}
//                         />
//                         <button className={styles.closeButton} onClick={handleCloseModal}>
//                             ×
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";
import { useState, useEffect } from "react";
import styles from "../css/PageCountryIndividual.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PageCountryIndividual() {
  interface ImageItem {
    url: string;
    alt: string;
  }

  interface TextSection {
    title: string | null;
    description: string;
  }

  interface Country {
    id: number;
    text: TextSection[];
    name: string;
    alt: string;
    imgmap: string;
    image?: ImageItem[];
  }

  const [countryData, setCountryData] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const countryId = params?.id;

  useEffect(() => {
    if (!countryId) return;

    fetch("/MainPageHeader.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch JSON");
        return res.json();
      })
      .then((data) => {
        const selectedCountry = data.bodyData.country.find(
          (c: Country) => c.id.toString() === countryId
        );
        if (selectedCountry) {
          setCountryData(selectedCountry);
        } else {
          console.error(`Страна с id ${countryId} не найдена`);
        }
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, [countryId]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!countryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{countryData.name}</h1>
      {/* Основной текст с обтеканием изображения */}
      {countryData.text && countryData.text.length > 0 && (
        <div className={styles.textSection}>
          <Image
            src={countryData.imgmap}
            alt={countryData.alt}
            width={450}
            height={250}
            className={styles.mapImage}
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
          {countryData.text.map((section, index) => (
            <div key={index} className={styles.textBlock}>
              {section.title && <h2>{section.title}</h2>}
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Галерея изображений */}
      {countryData.image && countryData.image.length > 0 && (
        <div className={styles.imageGallery}>
          {countryData.image.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt={img.alt}
              width={200}
              height={200}
              className={styles.galleryImage}
            />
          ))}
        </div>
      )}

      {/* Модальное окно */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={countryData.imgmap}
              alt={countryData.alt}
              width={1000}
              height={600}
              className={styles.modalImage}
            />
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}