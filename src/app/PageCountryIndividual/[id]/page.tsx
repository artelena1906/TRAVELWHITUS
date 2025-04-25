"use client";
import { useState, useEffect } from "react";
import styles from "../css/PageCountryIndividual.module.css";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

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

    interface Tour {
        id: string;
        date: string;
        country?: string;
        name: string;
        sity: string;
        description: string;
        seats: string;
        provider: string;
    }

    const [countryData, setCountryData] = useState<Country | null>(null);
    const [tours, setTours] = useState<Tour[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    const countryId = params?.id;

    useEffect(() => {
        if (!countryId) return;

        fetch("/MainPageHeader.json")
            .then((res) => res.json())
            .then((data) => {
                const selectedCountry = data.bodyData.country.find(
                    (c: Country) => c.id.toString() === countryId
                );
                if (selectedCountry) {
                    setCountryData(selectedCountry);
                    const filteredTours = data.bodyData.tours.filter((tour: Tour) =>
                        tour.country && tour.country.toLowerCase() === selectedCountry.name.toLowerCase()
                    );
                    setTours(filteredTours);
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

    const handleTourClick = (tourId: string) => {
        router.push(`/PageTourIndividual/${tourId}`);
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
                    {countryData.text.slice(0).map((section, index) => (
                        <div key={index} className={styles.textBlock}>
                            <h2>{section.title}</h2>
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

            {/* Секция туров */}
            {/* <div className={styles.containertour}>
                {tours.length > 0 ? (
                    <>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "20px", // для экранов < 600px
                                    sm: "24px", // для экранов ≥ 600px
                                    md: "30px", // для экранов ≥ 960px
                                },
                                textAlign: "center",
                                fontFamily: "Playwrite India",
                                color: "#556B2F",
                                fontStyle: "italic",
                                fontWeight: "bold",
                                margin: {
                                    xs: "10px 0 0 0", // меньшие отступы на маленьких экранах
                                    sm: "10px 0 0 0",
                                    md: "20px 0 10px 0", // стандартные отступы на средних и больших экранах
                                },
                            }}
                        >
                            Тури
                        </Typography>
                        <TableContainer
                            component={Paper}
                            sx={{
                                // width: "calc(100% - 20px)",
                                maxWidth: "100%",
                                overflowX: "auto",
                                margin: {
                                    xs: "10px 0 0 0", // меньшие отступы на маленьких экранах
                                    sm: "10px 0 0 0",
                                    md: "20px auto 0 auto", // стандартные отступы на средних и больших экранах
                                },
                                borderRadius: "15px",
                                boxShadow: "0 3px 6px rgba(54, 53, 53, 0.1)",
                                border: "1px solid rgba(173, 173, 173, 0.3)",
                            }}
                        >
                            <div style={{ overflow: "hidden", width: "100%" }}></div>
                            <Table
                                sx={{
                                    tableLayout: "fixed",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <TableHead sx={{ height: "auto" }}>
                                    <TableRow sx={{ backgroundColor: "#F5F5DC" }}>
                                        <TableCell sx={{
                                            border: "1px solid rgba(128, 128, 128, 0.1)", textAlign: "center",
                                            width: "12%", // Процентная ширина для пропорциональности
                                            minWidth: "80px", // Минимальная ширина для маленьких экранов
                                            fontSize: {
                                                xs: "8px", // Адаптивный размер текста
                                                sm: "10px",
                                                md: "12px",
                                                lg: "14px",
                                            },
                                        }}>
                                            <strong>Дата</strong>
                                        </TableCell>
                                        <TableCell sx={{
                                            border: "1px solid rgba(128, 128, 128, 0.1)", textAlign: "center",
                                            width: "75%", // Основная колонка занимает большую часть
                                            minWidth: "200px",
                                            fontSize: {
                                                xs: "8px",
                                                sm: "10px",
                                                md: "12px",
                                                lg: "14px",
                                            },
                                        }}>
                                            <strong>Назва туру</strong>
                                        </TableCell>
                                        <TableCell sx={{
                                            border: "1px solid rgba(128, 128, 128, 0.1)", textAlign: "center", margin: "0", padding: "0", lineHeight: "1.2",
                                            width: "13%",
                                            minWidth: "50px",
                                            fontSize: {
                                                xs: "8px",
                                                sm: "10px",
                                                md: "12px",
                                                lg: "14px",
                                            },
                                        }}>
                                            <strong>Наявність місць</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tours.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{
                                                cursor: "pointer",
                                                transformOrigin: "center",
                                                transition: "transform 0.3s ease-in-out",
                                                "&:hover": {
                                                    backgroundColor: "#f0f0f0",
                                                    transform: "scaleY(1.1)",
                                                    zIndex: 1,
                                                },
                                                overflow: "hidden",
                                            }}
                                            onClick={() => handleTourClick(item.id)} // Добавляем переход
                                        >
                                            <TableCell
                                                sx={{
                                                    border: "1px solid rgba(128, 128, 128, 0.2)", margin: "0", padding: "0",
                                                    fontSize: {
                                                        xs: "7px",
                                                        sm: "9px",
                                                        md: "12px",
                                                        lg: "14px",
                                                    },
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item.date}</TableCell>
                                            <TableCell
                                                sx={{
                                                    border: "1px solid rgba(128, 128, 128, 0.2)",
                                                    color: "#556B2F",
                                                }}
                                            >
                                                <Typography
                                                    component="strong"
                                                    sx={{
                                                        fontFamily: "Playwrite India",
                                                        fontStyle: "italic",
                                                        fontWeight: "bold",
                                                        "@media (min-width: 1200px)": {
                                                            fontSize: "22px",
                                                        },
                                                        "@media (max-width: 1199px)": {
                                                            fontSize: "22px",
                                                        },
                                                        "@media (max-width: 1000px)": {
                                                            fontSize: "20px",
                                                        },
                                                        "@media (max-width: 800px)": {
                                                            fontSize: "18px",
                                                        },
                                                        "@media (max-width: 700px)": {
                                                            fontSize: "16px",
                                                        },
                                                        "@media (max-width: 600px)": {
                                                            fontSize: "14px",
                                                        },
                                                        "@media (max-width: 500px)": {
                                                            fontSize: "12px",
                                                        },
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="gray"
                                                    sx={{
                                                        fontSize: "12px", margin: "5px 0",
                                                        lineHeight: "1.0",
                                                        "@media (max-width: 700px)": {
                                                            fontSize: "10px",
                                                            margin: "3px 0",
                                                        },
                                                        "@media (max-width: 500px)": {
                                                            fontSize: "8px",
                                                            margin: "2px 0",
                                                        },
                                                    }}
                                                >
                                                    {item.sity}
                                                </Typography>
                                                <Typography variant="body2" color="black"
                                                    sx={{
                                                        "@media (min-width: 1200px)": {
                                                            fontSize: "14px",
                                                        },
                                                        "@media (max-width: 1199px)": {
                                                            fontSize: "14px",
                                                        },
                                                        "@media (max-width: 1000px)": {
                                                            fontSize: "14px",
                                                        },
                                                        "@media (max-width: 800px)": {
                                                            fontSize: "12px",
                                                        },
                                                        "@media (max-width: 700px)": {
                                                            fontSize: "12px",
                                                        },
                                                        "@media (max-width: 600px)": {
                                                            fontSize: "10px",
                                                        },
                                                        "@media (max-width: 500px)": {
                                                            fontSize: "8px",
                                                        },
                                                        lineHeight: "1.2",
                                                    }}
                                                >
                                                    {item.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{
                                                border: "1px solid rgba(128, 128, 128, 0.2)", textAlign: "center", margin: "0", padding: "0",
                                                fontSize: {
                                                    xs: "7px",
                                                    sm: "9px",
                                                    md: "12px",
                                                    lg: "14px",
                                                  },
                                            }}>{item.seats}</TableCell>                                        
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <Typography
                        sx={{
                            textAlign: "center",
                            marginTop: "20px",
                            fontSize: "20px",
                            color: "#556B2F",
                            fontFamily: "Playwrite India",
                            fontStyle: "italic",
                        }}
                    >
                        За даним направленням тури в розробці
                    </Typography>
                )}
            </div> */}
        </div>
    );
}