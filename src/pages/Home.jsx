// src/pages/Home.jsx
import React from 'react';
import { TogoWrapper } from '../components/TogoWrapper'; // Припускаємо, що TogoWrapper - це ваш основний список справ

const Home = () => {
    // Компонент Home тепер просто рендерить TogoWrapper
    // Це дозволяє мати окремий файл Home.jsx, як вимагає імпорт в App.jsx
    return (
        <TogoWrapper />
    );
};

export default Home;
