"use client";
import React, { useState } from 'react';
import styles from "../../src/app/PageBookingForm/css/PageBookingForm.module.css"; 

// Определяем интерфейс для пропсов
interface BookingFormProps {
  tourTitle: string; 
  onClose: () => void; 
}

export default function BookingForm({ tourTitle, onClose }: BookingFormProps) { 
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Простая проверка формата телефона
    const phoneRegex = /^\+38\d{3}\d{3}\d{2}\d{2}$/;
    if (!phoneRegex.test(phone)) {
      alert("Будь ласка, введіть телефон в форматі +38ХХХХХХХХХХ"); // Используем двойные кавычки
      setIsLoading(false);
      return;
    }

    try {
      const message = `Тур: ${tourTitle}\nХоче забронювати: ${name}\nТелефон: ${phone}`;
      
      await fetch('/api/sendTelegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      alert('Замовлення успішно відправлено. Менеджер обов\'язково зв\'яжеться з вами!');
      setName('');
      setPhone('');
      if (onClose) onClose();
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Виникла помилка під час відправлення замовлення. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2> Тур: {tourTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Ім&apos;я:</label> 
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Телефон:</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+38 (ХХХ) ХХХ-ХХ-ХХ" 
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Відправка...' : 'Відправити'}
            </button>
            <button type="button" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
