// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts';
import { getAllUsersData } from '../firebase/firestore'; // Імпортуємо функцію для отримання даних користувачів

const AdminPanel = () => {
  // Отримуємо поточного користувача та статус входу з AuthContext
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate(); // Хук для програмної навігації

  // Стан для зберігання даних користувачів з Firestore
  const [users, setUsers] = useState([]);
  // Стан для відображення індикатора завантаження даних користувачів
  const [loadingUsers, setLoadingUsers] = useState(true);
  // Стан для зберігання повідомлень про помилки
  const [error, setError] = useState('');
  // Стан для визначення, чи є поточний користувач адміністратором
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect для завантаження даних та перевірки прав доступу при першому рендері
  useEffect(() => {
    const checkAdminStatusAndLoadData = async () => {
      // Якщо користувач не увійшов або його дані ще не завантажені, перенаправляємо на сторінку входу
      if (!userLoggedIn || !currentUser) {
        navigate('/login');
        return;
      }

      try {
        // Отримуємо ВСІ дані користувачів з Firestore
        const fetchedUsers = await getAllUsersData();
        setUsers(fetchedUsers); // Оновлюємо стан зі списком користувачів

        // Знаходимо документ поточного користувача у отриманих даних з Firestore за його UID
        const matchedUserFromFirestore = fetchedUsers.find(
          (user) => user.id === currentUser.uid
        );

        // Перевіряємо, чи існує документ користувача і чи має він роль 'admin'
        const isUserAdmin = matchedUserFromFirestore?.role === 'admin';

        if (!isUserAdmin) {
          // Якщо користувач не адміністратор, встановлюємо повідомлення про помилку,
          // позначаємо, що він не адмін, зупиняємо завантаження та виходимо з функції
          setError('У вас немає прав доступу до цієї сторінки.');
          setIsAdmin(false);
          setLoadingUsers(false);
          return; // Важливо: виходимо, щоб не відображати решту адмін-панелі
        } else {
          setIsAdmin(true); // Встановлюємо, що користувач є адміністратором
        }

      } catch (err) {
        // Обробка помилок під час завантаження даних
        console.error('Помилка завантаження даних адмін-панелі:', err);
        setError('Не вдалося завантажити дані. ' + err.message);
      } finally {
        // Завжди вимикаємо індикатор завантаження після спроби завантаження
        setLoadingUsers(false);
      }
    };

    checkAdminStatusAndLoadData();
  }, [userLoggedIn, currentUser, navigate]); // Залежності useEffect: повторний запуск при зміні цих значень

  // Умовний рендеринг: відображення повідомлення про заборону доступу
  if (userLoggedIn && !isAdmin && !loadingUsers) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="text-red-600">🚫 Доступ заборонено</h2>
          <p>У вас немає прав доступу до цієї сторінки.</p>
          <button onClick={() => navigate('/home')} className="auth-btn mt-4">
            Повернутися до головної
          </button>
        </div>
      </div>
    );
  }

  // Умовний рендеринг: відображення індикатора завантаження
  if (loadingUsers) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p>Завантаження панелі адміністратора...</p>
        </div>
      </div>
    );
  }

  // Умовний рендеринг: відображення повідомлення про помилку завантаження
  if (error) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="text-red-600">Помилка</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/home')} className="auth-btn mt-4">
            Повернутися до головної
          </button>
        </div>
      </div>
    );
  }

  // Основний рендеринг адмін-панелі (відображається тільки якщо користувач є адміністратором і дані завантажені)
  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 className="text-2xl text-[#3b5e4c] mb-6 font-semibold">Панель адміністратора</h2>

        {/* Таблиця користувачів */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-[#3a9a5c] rounded">
            <thead className="bg-[#f0faf5] text-[#2f4d3c]">
              <tr>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">UID</th>
                <th className="px-4 py-2 border-b">Дата реєстрації</th>
                <th className="px-4 py-2 border-b">Роль</th>
              </tr>
            </thead>
            <tbody>
              {/* Перевірка, чи є користувачі для відображення */}
              {users.length === 0 ? (
                <tr>
                  {/* Якщо користувачів немає, виводимо повідомлення */}
                  <td colSpan="4" className="text-center text-gray-500 py-4">Користувачів не знайдено.</td>
                </tr>
              ) : (
                // Якщо користувачі є, перебираємо їх і створюємо рядки таблиці
                users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.email || '—'}</td>
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">
                      {/* Обробка Firestore Timestamp для відображення дати */}
                      {user.createdAt?.seconds
                        ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="px-4 py-2">{user.role || 'user'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

// src/firebase/firestore.js
// Цей файл містить функції для взаємодії з Firebase Firestore.
