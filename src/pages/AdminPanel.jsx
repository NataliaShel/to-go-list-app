import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts';
import { getAllUsersData } from '../firebase/firestore';

const AdminPanel = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await getAllUsersData();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Не вдалося завантажити дані. ' + err.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  if (loadingUsers) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p>Завантаження панелі адміністратора...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 className="text-2xl text-[#3b5e4c] mb-6 font-semibold">Панель адміністратора</h2>
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    Користувачів не знайдено.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.email || '—'}</td>
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">
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
