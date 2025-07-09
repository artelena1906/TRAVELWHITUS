"use client";
import { useState, useEffect } from "react";
import styles from "../css/PageTours.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import Search from "../../MainPage/tsx/MainPageSearch";

interface Tour {
    id: string;
    date: string;
    country: string;
    name: string;
    sity: string;
    description: string;
    seats: string;
    provider: string;
}

export default function PageSearchIndividual() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTours = async () => {
            try {
                setLoading(true);
                const res = await fetch("/MainPageHeader.json");
                if (!res.ok) throw new Error("Не вдалося завантажити дані");
                const data = await res.json();

                const allTours = data.bodyData.tours;
                const country = searchParams.get("country") || "Всі країни";
                const dateStr = searchParams.get("date");

                const filteredTours = allTours.filter((tour: Tour) => {
                    const tourDate = parseTourDate(tour.date);
                    const selectedDate = dateStr ? new Date(dateStr) : null;

                    const matchesCountry = country === "Всі країни" ? true : tour.country === country;
                    const matchesDate = selectedDate ? tourDate >= selectedDate : true;

                    return matchesCountry && matchesDate;
                });

                setTours(filteredTours);
                setError(null);
            } catch (err) {
                setError("Помилка при завантаженні турів");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, [searchParams]); // Зависимость от searchParams для обновления при изменении URL

    const parseTourDate = (dateStr: string): Date => {
        const [day, month, year] = dateStr.split(".").map(Number);
        return new Date(year, month - 1, day);
    };

    // Функция для группировки туров по году и месяцу
    const groupToursByYearAndMonth = (tours: Tour[]) => {
        const months = [
            "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
            "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
        ];

        const grouped: { [year: string]: { [month: string]: Tour[] } } = {};

        tours.forEach((tour) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [day, month, year] = tour.date.split(".");
            const monthIndex = parseInt(month, 10) - 1;
            const monthName = months[monthIndex];
            const yearStr = year.toString();

            if (!grouped[yearStr]) {
                grouped[yearStr] = {};
            }
            if (!grouped[yearStr][monthName]) {
                grouped[yearStr][monthName] = [];
            }
            grouped[yearStr][monthName].push(tour);
        });

        const sortedGroups: { title: string; tours: Tour[] }[] = [];
        Object.keys(grouped)
            .sort()
            .forEach((year) => {
                months.forEach((month) => {
                    if (grouped[year][month]) {
                        sortedGroups.push({
                            title: `${month} ${year}`,
                            tours: grouped[year][month],
                        });
                    }
                });
            });

        return sortedGroups;
    };

    const handleTourClick = (tourId: string) => {
        router.push(`/PageTourIndividual/${tourId}`);
    };

    if (loading) {
        return (
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
                Немає турів за вашими критеріями
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography
                sx={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "20px",
                    color: "#FF0000",
                    fontFamily: "Playwrite India",
                    fontStyle: "italic",
                }}
            >
                {error}
            </Typography>
        );
    }

    // Отображаем сообщение, если туров нет
    if (tours.length === 0) {
        return (
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
                Немає турів за вашими критеріями
            </Typography>
        );
    }

    const groupedTours = groupToursByYearAndMonth(tours);

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <Search />
            </div>
            <hr className={styles.h} />
            <p>Ви відкрили список турів, і це не просто маршрути та дати. Це запрошення відправитися туди, де вас чекають відкриття, незвідані стежки та моменти, що залишаться з вами назавжди.</p>
            <p>Тут кожна подорож — як перегортання сторінок захопливої книги, де ви головний герой. </p>
            <p>Який розділ цієї історії стане вашим?</p>
            <p>Обирайте маршрут — і нехай перша сторінка вашої нової пригоди відкриється просто зараз.</p>
            {/* Секция туров */}
            <div className={styles.containertour}>
                {groupedTours.length > 0 ? (
                    groupedTours.map((group) => (
                        <div key={group.title} style={{ marginBottom: "40px" }}>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "20px",
                                        sm: "24px",
                                        md: "28px",
                                    },
                                    textAlign: "center",
                                    fontFamily: "Playwrite India",
                                    color: "#556B2F",
                                    fontStyle: "italic",
                                    fontWeight: "bold",
                                    margin: "0",
                                }}
                            >
                                {group.title} {/* Исправлено с month на group.title */}
                            </Typography>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    maxWidth: "100%",
                                    overflowX: "auto",
                                    margin: {
                                        xs: "10px 0 0 0",
                                        sm: "10px 0 0 0",
                                        md: "10px auto 0 auto",
                                    },
                                    borderRadius: "15px",
                                    boxShadow: "0 3px 6px rgba(54, 53, 53, 0.5)",
                                    border: "1px solid rgba(173, 173, 173, 0.3)",
                                }}
                            >
                                <Table sx={{ tableLayout: "fixed", width: "100%", borderCollapse: "collapse" }}>
                                    <TableHead sx={{ height: "auto" }}>
                                        <TableRow sx={{ backgroundColor: "#F5F5DC" }}>
                                            <TableCell
                                                sx={{
                                                    border: "1px solid rgba(128, 128, 128, 0.1)",
                                                    textAlign: "center",
                                                    width: "12%", // Процентная ширина для пропорциональности
                                                    minWidth: "80px", // Минимальная ширина для маленьких экранов
                                                    fontSize: {
                                                        xs: "8px", // Адаптивный размер текста
                                                        sm: "10px",
                                                        md: "12px",
                                                        lg: "14px",
                                                    },
                                                }}
                                            >
                                                <strong>Дата</strong>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    border: "1px solid rgba(128, 128, 128, 0.1)",
                                                    textAlign: "center",
                                                    width: "75%", // Основная колонка занимает большую часть
                                                    minWidth: "200px",
                                                    fontSize: {
                                                        xs: "8px",
                                                        sm: "10px",
                                                        md: "12px",
                                                        lg: "14px",
                                                    },
                                                }}
                                            >
                                                <strong>Назва туру</strong>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    border: "1px solid rgba(128, 128, 128, 0.1)",
                                                    textAlign: "center",
                                                    margin: "0",
                                                    padding: "0",
                                                    lineHeight: "1.2",
                                                    width: "13%",
                                                    minWidth: "50px",
                                                    fontSize: {
                                                        xs: "8px",
                                                        sm: "10px",
                                                        md: "12px",
                                                        lg: "14px",
                                                    },
                                                }}
                                            >
                                                <strong>Наявність місць</strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {group.tours.map((item) => ( // Исправлено с monthTours на group.tours
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
                                                onClick={() => handleTourClick(item.id)}
                                            >
                                                <TableCell
                                                    sx={{
                                                        border: "1px solid rgba(128, 128, 128, 0.2)",
                                                        margin: "0",
                                                        padding: "0",
                                                        fontSize: {
                                                            xs: "7px",
                                                            sm: "9px",
                                                            md: "12px",
                                                            lg: "14px",
                                                        },
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item.date}
                                                </TableCell>
                                                <TableCell sx={{ border: "1px solid rgba(128, 128, 128, 0.2)", color: "#556B2F" }}>
                                                    <Typography
                                                        component="strong"
                                                        sx={{
                                                            fontFamily: "Playwrite India",
                                                            fontStyle: "italic",
                                                            fontWeight: "bold",
                                                            "@media (min-width: 1200px)": { fontSize: "22px" },
                                                            "@media (max-width: 1199px)": { fontSize: "22px" },
                                                            "@media (max-width: 1000px)": { fontSize: "20px" },
                                                            "@media (max-width: 800px)": { fontSize: "18px" },
                                                            "@media (max-width: 700px)": { fontSize: "16px" },
                                                            "@media (max-width: 600px)": { fontSize: "14px" },
                                                            "@media (max-width: 500px)": { fontSize: "12px" },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="gray"
                                                        sx={{
                                                            fontSize: "12px", margin: "5px 0",
                                                            lineHeight: "1.2",
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
                                                    <Typography
                                                        variant="body2"
                                                        color="black"
                                                        sx={{
                                                            "@media (min-width: 1200px)": { fontSize: "14px" },
                                                            "@media (max-width: 1199px)": { fontSize: "14px" },
                                                            "@media (max-width: 1000px)": { fontSize: "14px" },
                                                            "@media (max-width: 800px)": { fontSize: "12px" },
                                                            "@media (max-width: 700px)": { fontSize: "12px" },
                                                            "@media (max-width: 600px)": { fontSize: "10px" },
                                                            "@media (max-width: 500px)": { fontSize: "8px" },
                                                            lineHeight: "1.2",
                                                        }}
                                                    >
                                                        {item.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        border: "1px solid rgba(128, 128, 128, 0.2)",
                                                        textAlign: "center",
                                                        margin: "0",
                                                        padding: "0",
                                                        fontSize: {
                                                            xs: "7px",
                                                            sm: "9px",
                                                            md: "12px",
                                                            lg: "14px",
                                                          },
                                                    }}
                                                >
                                                    {item.seats}
                                                </TableCell>                                        
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ))
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
                        Немає турів за вашими критеріями
                    </Typography>
                )}
            </div>
        </div>
    );
}