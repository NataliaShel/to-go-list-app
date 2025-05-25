// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts';
import { auth } from '../firebase/firebase'; // Імпорт auth для signOut

const Navbar = () => {
    const { userLoggedIn, currentUser, isAdmin, doSignOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await doSignOut(auth);
            navigate('/login'); // Перенаправлення на сторінку входу після виходу
        } catch (error) {
            console.error("Помилка при виході:", error);
        }
    };

    return (
        <nav className="app-navbar">
            <div className="navbar-container">
                {/* Лого або назва додатку */}
                <Link to="/" className="navbar-brand">
                    My App
                </Link>

                {/* Навігаційні посилання */}
                <div className="navbar-links-group">
                    {userLoggedIn ? (
                        <>
                            {/* Якщо користувач увійшов: */}
                            {/* >>>>>>> ВИДАЛЕНО: "Мої Плани" з Navbar (хоча сторінка існує за маршрутом) */}
                            {/* >>>>>>> ВИДАЛЕНО: "Контакти" з Navbar */}

                            {isAdmin && (
                                <Link to="/admin" className="navbar-link navbar-admin-link">
                                    Адмін-панель
                                </Link>
                            )}
                            <span className="navbar-user-info">
                                Привіт, {currentUser?.email || 'Користувач'}!
                            </span>
                            <button
                                onClick={handleLogout}
                                className="auth-btn navbar-logout-btn"
                            >
                                Вийти
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Якщо користувач не увійшов: */}
                            <Link to="/login" className="auth-btn">
                                Увійти
                            </Link>
                            <Link to="/register" className="auth-btn auth-btn-secondary">
                                Зареєструватися
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;