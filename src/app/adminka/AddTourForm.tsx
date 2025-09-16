/* 'use client';
import React, { useState } from "react";
import { Box, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";
import { TourDay } from "../../types/tour";

export interface FullTour {
  name: string;
  country: string;
  continent: string;
  countryDescription?: string | null;
  date: string;
  month: string;
  sity: string;
  typeID: string;
  seats: string;
  price: number;
  activity: boolean;
  description: string;
  urlimage?: string | null;
  urlvideo?: string | null;
  counter: number;
  days?: TourDay[]
}

interface AddTourFormProps {
  onClose: () => void;
  onAdd: (tourData: Omit<FullTour, "id">) => void;
}

export default function AddTourForm({ onClose, onAdd }: AddTourFormProps) {
  const [formData, setFormData] = useState<Omit<FullTour, "id">>({
    name: "",
    country: "",
    countryDescription: "",
    continent: "",
    date: "",
    month: "",
    sity: "",
    typeID: "",
    seats: "",
    price: 0,
    activity: true,
    description: "",
    urlimage: null,   
    urlvideo: null,   
    counter: 0,
    days: [],
  });

  const [days, setDays] = useState<TourDay[]>([]);

  const addDay = () => {
  const newDay: TourDay = {
    id: crypto.randomUUID(), // уникальный id
    dayNumber: days.length + 1,
    date: "",
    description: "",
    photos: [],
  };
  setDays(prev => [...prev, newDay]);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔑 если поле пустое, сохраняем null
    const preparedData = {
      ...formData,
      urlimage: formData.urlimage?.trim() ? formData.urlimage : null,
      urlvideo: formData.urlvideo?.trim() ? formData.urlvideo : null,
    };

    onAdd(preparedData);
    onClose();
  };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
      <TextField label="Назва туру" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Країна" name="country" value={formData.country} onChange={handleChange} required />
      <TextField label="Опис країни" name="countryDescription" value={formData.countryDescription} onChange={handleChange} required />
      <TextField label="Континент" name="continent" value={formData.continent} onChange={handleChange} required />
      <TextField label="Дата (дд.мм.рррр)" name="date" value={formData.date} onChange={handleChange} required />
      <TextField label="Місяць" name="month" value={formData.month} onChange={handleChange} required />
      <TextField label="Місто маршруту" name="sity" value={formData.sity} onChange={handleChange} required />
      <TextField label="Тип туру" name="typeID" value={formData.typeID} onChange={handleChange} required />
      <TextField label="Місця" name="seats" value={formData.seats} onChange={handleChange} required />

      <TextField
        type="number"
        label="Ціна"
        variant="outlined"
        value={formData.price === 0 ? "" : formData.price}
        placeholder="0"
        onChange={handleNumberChange}
        name="price"
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox checked={formData.activity} onChange={handleChange} name="activity" />}
        label="Активний тур"
      />

      <TextField label="Опис" name="description" value={formData.description} onChange={handleChange} multiline rows={3} required />
      <TextField label="URL зображення" name="urlimage" value={formData.urlimage || ""} onChange={handleChange} />
      <TextField label="URL відео" name="urlvideo" value={formData.urlvideo || ""} onChange={handleChange} />
      <TextField
        label="Лічильник"
        name="counter"
        type="number"
        value={formData.counter}
        onChange={handleNumberChange}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="contained" color="primary" type="submit">Додати</Button>
        <Button variant="outlined" onClick={onClose}>Скасувати</Button>
      </Box>
    </Box>
  );
}
 */

// 'use client';
// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, FormControlLabel, Checkbox, Typography } from "@mui/material";
// import { FullTour, TourDay } from "../../types/tour";

// interface AddTourFormProps {
//   onClose: () => void;
//   onAdd: (tourData: Omit<FullTour, "id">) => void;
//   initialData?: Omit<FullTour, "id">; // для редактирования
// }

// export default function AddTourForm({ onClose, onAdd, initialData }: AddTourFormProps) {
//   const [formData, setFormData] = useState<Omit<FullTour, "id">>({
//     name: "",
//     country: "",
//     countryDescription: "",
//     continent: "",
//     date: "",
//     month: "",
//     sity: "",
//     typeID: "",
//     seats: "",
//     price: 0,
//     activity: true,
//     description: "",
//     urlimage: "",
//     urlvideo: "",
//     counter: 0,
//     days: [],
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   // Основные поля
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value === "" ? 0 : Number(value),
//     }));
//   };

//   // Дни тура
//   const addDay = () => {
//     const newDay: TourDay = {
//       id: crypto.randomUUID(),
//       dayNumber: formData.days.length + 1,
//       date: "",
//       description: "",
//       photos: [],
//     };
//     setFormData(prev => ({ ...prev, days: [...prev.days, newDay] }));
//   };

//   const updateDay = (id: string, key: keyof TourDay, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       days: prev.days.map(d => d.id === id ? { ...d, [key]: value } : d),
//     }));
//   };

//   const removeDay = (id: string) => {
//     setFormData(prev => ({
//       ...prev,
//       days: prev.days.filter(d => d.id !== id),
//     }));
//   };

//   const addPhotoToDay = (id: string, photoUrl: string) => {
//     setFormData(prev => ({
//       ...prev,
//       days: prev.days.map(d => d.id === id ? { ...d, photos: [...d.photos, photoUrl] } : d),
//     }));
//   };

//   const removePhotoFromDay = (id: string, index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       days: prev.days.map(d =>
//         d.id === id ? { ...d, photos: d.photos.filter((_, i) => i !== index) } : d
//       ),
//     }));
//   };

//   // Сабмит
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onAdd(formData);
//     onClose();
//   };

//   return (
//     <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
//       {/* Основные поля */}
//       <TextField label="Назва туру" name="name" value={formData.name} onChange={handleChange} required />
//       <TextField label="Країна" name="country" value={formData.country} onChange={handleChange} required />
//       <TextField label="Опис країни" name="countryDescription" value={formData.countryDescription} onChange={handleChange} />
//       <TextField label="Континент" name="continent" value={formData.continent} onChange={handleChange} required />
//       <TextField label="Дата (дд.мм.рррр)" name="date" value={formData.date} onChange={handleChange} required />
//       <TextField label="Місяць" name="month" value={formData.month} onChange={handleChange} required />
//       <TextField label="Місто маршруту" name="sity" value={formData.sity} onChange={handleChange} required />
//       <TextField label="Тип туру" name="typeID" value={formData.typeID} onChange={handleChange} required />
//       <TextField label="Місця" name="seats" value={formData.seats} onChange={handleChange} required />

//       <TextField
//         type="number"
//         label="Ціна"
//         value={formData.price === 0 ? "" : formData.price}
//         onChange={handleNumberChange}
//         name="price"
//         fullWidth
//       />

//       <FormControlLabel
//         control={<Checkbox checked={formData.activity} onChange={handleChange} name="activity" />}
//         label="Активний тур"
//       />

//       <TextField label="Опис" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
//       <TextField label="URL зображення" name="urlimage" value={formData.urlimage || ""} onChange={handleChange} />
//       <TextField label="URL відео" name="urlvideo" value={formData.urlvideo || ""} onChange={handleChange} />
//       <TextField
//         label="Лічильник"
//         name="counter"
//         type="number"
//         value={formData.counter}
//         onChange={handleNumberChange}
//       />

//       {/* Дні туру */}
//       <Box sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
//         <Typography variant="h6">Дні туру</Typography>
//         {formData.days.map(day => (
//           <Box key={day.id} sx={{ mb: 2, borderBottom: "1px dashed #aaa", pb: 1 }}>
//             {/* Номер дня */}
//             <TextField
//               label="Номер дня"
//               type="number"
//               value={day.dayNumber}
//               onChange={e => updateDay(day.id, "dayNumber", Number(e.target.value))}
//               fullWidth
//               sx={{ mb: 1 }}
//             />
//             {/* Дата дня */}
//             <TextField
//               label="Дата дня"
//               type="date"
//               value={day.date}
//               onChange={e => updateDay(day.id, "date", e.target.value)}
//               fullWidth
//               sx={{ mb: 1 }}
//             />
//             {/* Описание дня */}
//             <TextField
//               label="Опис дня"
//               value={day.description}
//               onChange={e => updateDay(day.id, "description", e.target.value)}
//               multiline
//               rows={3}
//               fullWidth
//               sx={{ mb: 1 }}
//             />

//             {/* Фото дня */}
//             {day.photos.map((p, i) => (
//               <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                 <TextField value={p} fullWidth disabled />
//                 <Button color="error" onClick={() => removePhotoFromDay(day.id, i)}>Видалити фото</Button>
//               </Box>
//             ))}
//             <Button onClick={() => {
//               const url = prompt("Введіть URL фото");
//               if (url) addPhotoToDay(day.id, url);
//             }}>Додати фото</Button>
//             <Button color="error" onClick={() => removeDay(day.id)}>Видалити день</Button>
//           </Box>
//         ))}
//         <Button variant="outlined" onClick={addDay}>Додати день</Button>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//         <Button variant="contained" color="primary" type="submit">Додати / Зберегти</Button>
//         <Button variant="outlined" onClick={onClose}>Скасувати</Button>
//       </Box>
//     </Box>
//   );
// }


'use client';
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { FullTour, TourDay } from "../../types/tour";

interface AddTourFormProps {
  onClose: () => void;
  onAdd: (tourData: Omit<FullTour, "id">) => void;
  initialData?: Omit<FullTour, "id">; // для редактирования
}

export default function AddTourForm({ onClose, onAdd, initialData }: AddTourFormProps) {
  const [formData, setFormData] = useState<Omit<FullTour, "id">>({
    name: "",
    country: "",
    countryDescription: "",
    continent: "",
    date: "",
    month: "",
    sity: "",
    typeID: "",
    seats: "",
    price: 0,
    activity: true,
    description: "",
    urlimage: "",
    urlvideo: "",
    counter: 0,
    days: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Основные поля
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  // Дни тура
  const addDay = () => {
    const newDay: TourDay = {
      id: crypto.randomUUID(),
      dayNumber: formData.days.length + 1,
      date: "",
      description: "",
      photos: [],
    };
    setFormData(prev => ({ ...prev, days: [...prev.days, newDay] }));
  };

  const updateDay = (id: string, key: keyof TourDay, value: any) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(d => d.id === id ? { ...d, [key]: value } : d),
    }));
  };

  const removeDay = (id: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.filter(d => d.id !== id),
    }));
  };

  const addPhotoToDay = (id: string, photoUrl: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(d => d.id === id ? { ...d, photos: [...d.photos, photoUrl] } : d),
    }));
  };

  const removePhotoFromDay = (id: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map(d =>
        d.id === id ? { ...d, photos: d.photos.filter((_, i) => i !== index) } : d
      ),
    }));
  };

  // Сабмит
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
      {/* Основные поля */}
      <TextField label="Назва туру" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Країна" name="country" value={formData.country} onChange={handleChange} required />
      <TextField label="Опис країни" name="countryDescription" value={formData.countryDescription} onChange={handleChange} />
      <TextField label="Континент" name="continent" value={formData.continent} onChange={handleChange} required />
      <TextField label="Дата (дд.мм.рррр)" name="date" value={formData.date} onChange={handleChange} required />
      <TextField label="Місяць" name="month" value={formData.month} onChange={handleChange} required />
      <TextField label="Місто маршруту" name="sity" value={formData.sity} onChange={handleChange} required />
      <TextField label="Тип туру" name="typeID" value={formData.typeID} onChange={handleChange} required />
      <TextField label="Місця" name="seats" value={formData.seats} onChange={handleChange} required />

      <TextField
        type="number"
        label="Ціна"
        value={formData.price === 0 ? "" : formData.price}
        onChange={handleNumberChange}
        name="price"
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox checked={formData.activity} onChange={handleChange} name="activity" />}
        label="Активний тур"
      />

      <TextField label="Опис" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
      <TextField label="URL зображення" name="urlimage" value={formData.urlimage || ""} onChange={handleChange} />
      <TextField label="URL відео" name="urlvideo" value={formData.urlvideo || ""} onChange={handleChange} />
      <TextField
        label="Лічильник"
        name="counter"
        type="number"
        value={formData.counter}
        onChange={handleNumberChange}
      />

      {/* Дні туру */}
      <Box sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
        <Typography variant="h6">Дні туру</Typography>
        {formData.days.map(day => (
          <Box key={day.id} sx={{ mb: 2, borderBottom: "1px dashed #aaa", pb: 1 }}>
            {/* Номер дня */}
            <TextField
              label="Номер дня"
              type="number"
              value={day.dayNumber}
              onChange={e => updateDay(day.id, "dayNumber", Number(e.target.value))}
              fullWidth
              sx={{ mb: 1 }}
            />
            {/* Дата дня */}
            <TextField
              label="Дата дня"
              type="date"
              value={day.date}
              onChange={e => updateDay(day.id, "date", e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            {/* Описание дня */}
            <TextField
              label="Опис дня"
              value={day.description}
              onChange={e => updateDay(day.id, "description", e.target.value)}
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 1 }}
            />

            {/* Теперь рендер описания с переносами */}
            {day.description && (
              <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 1, color: "text.secondary" }}>
                {day.description}
              </Typography>
            )}

            {/* Фото дня */}
            {day.photos.map((p, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <TextField value={p} fullWidth disabled />
                <Button color="error" onClick={() => removePhotoFromDay(day.id, i)}>Видалити фото</Button>
              </Box>
            ))}
            <Button onClick={() => {
              const url = prompt("Введіть URL фото");
              if (url) addPhotoToDay(day.id, url);
            }}>Додати фото</Button>
            <Button color="error" onClick={() => removeDay(day.id)}>Видалити день</Button>
          </Box>
        ))}
        <Button variant="outlined" onClick={addDay}>Додати день</Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="contained" color="primary" type="submit">Додати / Зберегти</Button>
        <Button variant="outlined" onClick={onClose}>Скасувати</Button>
      </Box>
    </Box>
  );
}
