'use client';
import React, { useState } from "react";
import { Box, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

export interface FullTour {
  name: string;
  country: string;
  continent: string;
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
}

interface AddTourFormProps {
  onClose: () => void;
  onAdd: (tourData: Omit<FullTour, "id">) => void;
}

export default function AddTourForm({ onClose, onAdd }: AddTourFormProps) {
  const [formData, setFormData] = useState<Omit<FullTour, "id">>({
    name: "",
    country: "",
    continent: "",
    date: "",
    month: "",
    sity: "",
    typeID: "",
    seats: "",
    price: 0,
    activity: true,
    description: "",
    urlimage: null,   // <-- null вместо ""
    urlvideo: null,   // <-- null вместо ""
    counter: 0,
  });

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
