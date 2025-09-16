// 'use client';
// import React, { useEffect, useState } from "react";
// import { Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { app } from "../../../firebase";
// import AddTourForm from "./AddTourForm";

// interface Tour {
//   id: string;
//   name: string;
//   country: string;
//   date: string;
//   sity: string;
//   price: number;
//   seats: string;
//   urlimage: string;
// }

// export default function ToursList() {
//   const [tours, setTours] = useState<Tour[]>([]);

//   useEffect(() => {
//     const db = getFirestore(app);
//     const fetchTours = async () => {
//       const querySnapshot = await getDocs(collection(db, "tours"));
//       const toursData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tour));
//       setTours(toursData);
//     };
//     fetchTours();
//   }, []);

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Кнопка "Додати тур" сверху */}
//       <Box sx={{ mb: 3,  }}>
//         <Button 
//         sx={{color: "white", fontWeight: "bold", backgroundColor: "red", textTransform: "none",                            }}
//         variant="contained" onClick={() => alert("Додати новий тур")} >
//           Додати тур
//         </Button>
//       </Box>

//       {/* Сетка карточек через CSS grid */}
//       <Box
//         sx={{
//           display: 'grid',
//           gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
//           gap: 2,
//         }}
//       >        
//         {tours.map((tour) => (  
//           <Card key={tour.id} sx={{ position: "relative" }}>
//             <CardMedia
//               component="img"
//               height="200"
//               image={tour.urlimage}
//               alt={tour.name}
//             />
//                 <CardContent>
//                     <Typography variant="h6">{tour.country}</Typography>
//                     <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "18px", lineHeight: 1, margin: "10px 0" }}>{tour.name}</Typography>
//                     <Typography variant="body2" sx={{ margin: "20px 0" }}>{tour.sity}</Typography>
//                     <Typography variant="body2" sx={{ margin: "20px 0", fontWeight: "bold", }}>Дата: {tour.date}</Typography>
//                     <Typography variant="body2">Місця: {tour.seats}</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "22px", margin: "10px 0", color: "red" }}>{tour.price} €</Typography>
//                     <Box sx={{ mt: 1 }}>
//                         <Button
//                             variant="outlined"
//                             size="small"
//                             sx={{
//                                 position: "absolute",
//                                 bottom: 20,
//                                 right:15,
//                                 color: "white",
//                                 fontWeight: "bold",
//                                 backgroundColor: "blue", 
//                                 borderColor: "blue",
//                                 textTransform: "none",
//                             }}
//                             onClick={() => alert(`Редагувати тур: ${tour.name}`)}
//                         >
//                             Редагувати
//                         </Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// }

'use client';
import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button, Modal } from "@mui/material";
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import AddTourForm from "./AddTourForm";
import { FullTour, TourDay } from "../../types/tour";

interface TourCardData {
  id: string;
  name: string;
  country: string;
  countryDescription?: string;
  date: string;
  sity: string;
  price: number;
  seats: string;
  urlimage: string;
  urlvideo?: string;
  continent?: string;
  month?: string;
  typeID?: string;
  description?: string;
  counter?: number;
  days?: TourDay[];
  activity?: boolean;
}

export default function ToursList() {
  const [tours, setTours] = useState<TourCardData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingTour, setEditingTour] = useState<FullTour | null>(null);

  // Загрузка туров
  const fetchTours = async () => {
    const querySnapshot = await getDocs(collection(db, "tours"));
    const toursData = querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        country: data.country,
        countryDescription: data.countryDescription || "",
        date: data.date,
        sity: data.sity,
        price: data.price,
        seats: data.seats,
        urlimage: data.urlimage || "/placeholder.jpg",
        urlvideo: data.urlvideo || "",
        continent: data.continent || "",
        month: data.month || "",
        typeID: data.typeID || "",
        description: data.description || "",
        counter: data.counter || 0,
        days: data.days || [],
        activity: data.activity ?? true,
      } as TourCardData;
    });
    setTours(toursData);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Добавление нового тура
  const handleAddTour = async (tourData: Omit<FullTour, "id">) => {
    const docRef = await addDoc(collection(db, "tours"), tourData);

    const newTour: TourCardData = {
      id: docRef.id,
      ...tourData,
      urlimage: tourData.urlimage || "/placeholder.jpg",
      urlvideo: tourData.urlvideo || "",
      countryDescription: tourData.countryDescription || "",
      days: tourData.days || [],
      activity: tourData.activity ?? true,
    };

    setTours(prev => [...prev, newTour]);
    setOpenModal(false);
  };

  // Редактирование тура
 const handleOpenEdit = (tour: TourCardData) => {
  setEditingTour({
    id: tour.id,
    name: tour.name || "",
    country: tour.country || "",
    countryDescription: tour.countryDescription || "",
    date: tour.date || "",
    sity: tour.sity || "",
    price: tour.price || 0,
    seats: tour.seats || "",
    urlimage: tour.urlimage || "",
    urlvideo: tour.urlvideo || "",
    continent: tour.continent || "",
    month: tour.month || "",
    typeID: tour.typeID || "",
    description: tour.description || "",
    counter: tour.counter || 0,
    activity: tour.activity ?? true,
    days: tour.days || [],
  });
  setOpenModal(true);
};

const handleUpdateTour = async (tourData: Omit<FullTour, "id">) => {
  if (!editingTour) return;

  const docRef = doc(db, "tours", editingTour.id);
  await updateDoc(docRef, tourData);

  setTours(prev =>
    prev.map(t =>
      t.id === editingTour.id
        ? {
            ...t,
            name: tourData.name,
            country: tourData.country,
            countryDescription: tourData.countryDescription,
            date: tourData.date,
            sity: tourData.sity,
            price: tourData.price,
            seats: tourData.seats,
            urlimage: tourData.urlimage || "/placeholder.jpg",
          }
        : t
    )
  );

  setEditingTour(null);
  setOpenModal(false);
};


  const handleCloseModal = () => {
    setEditingTour(null);
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            backgroundColor: "red",
            textTransform: "none",
          }}
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          Додати тур
        </Button>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
            width: { xs: "90%", sm: 600, md: 800 },
          }}
        >
          <AddTourForm
            onClose={handleCloseModal}
            onAdd={editingTour ? handleUpdateTour : handleAddTour}
            initialData={editingTour ?? undefined}
          />
        </Box>
      </Modal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: 2,
        }}
      >
        {tours.map((tour) => (
          <Card key={tour.id} sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="200"
              image={tour.urlimage}
              alt={tour.name}
            />
            <CardContent>
              <Typography variant="h6">{tour.country}</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "18px", lineHeight: 1, margin: "10px 0" }}>
                {tour.name}
              </Typography>
              <Typography variant="body2" sx={{ margin: "20px 0" }}>{tour.sity}</Typography>
              <Typography variant="body2" sx={{ margin: "20px 0", fontWeight: "bold" }}>Дата: {tour.date}</Typography>
              <Typography variant="body2">Місця: {tour.seats}</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "22px", margin: "10px 0", color: "red" }}>
                {tour.price} €
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 20,
                  right: 15,
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "blue",
                  borderColor: "blue",
                  textTransform: "none",
                }}
                onClick={() => handleOpenEdit(tour)}
              >
                Редагувати
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
