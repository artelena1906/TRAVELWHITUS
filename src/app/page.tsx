import React from "react";
// Импортируем основной компонент страницы
import MainPageContent from "./MainPage/page"; 

export default function Home() {
  return (
    // Хедер и футер подключаются автоматически через layout.tsx
    <MainPageContent />
  );
}