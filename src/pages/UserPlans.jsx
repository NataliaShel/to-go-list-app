// src/pages/UserPlans.jsx (або інший шлях, залежить від вашої структури)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts'; // Переконайтеся, що шлях правильний
import { getPlannersByUserId, addPlanner, deletePlanner } from '../firebase/firestore'; // Імпортуємо нові функції Firestore

const UserPlans = () => {
    const { currentUser, userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [planners, setPlanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newPlanName, setNewPlanName] = useState('');
    const [newPlanDescription, setNewPlanDescription] = useState('');

    useEffect(() => {
        const fetchPlanners = async () => {
            if (!userLoggedIn || !currentUser) {
                navigate('/login'); // Перенаправлення, якщо користувач не увійшов
                return;
            }

            try {
                setLoading(true);
                setError('');
                const userPlanners = await getPlannersByUserId(currentUser.uid);
                setPlanners(userPlanners);
            } catch (err) {
                console.error("Помилка завантаження планів:", err);
                setError('Не вдалося завантажити плани. ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanners();
    }, [userLoggedIn, currentUser, navigate]); // Залежності: повторне завантаження при зміні користувача

    const handleAddPlan = async (e) => {
        e.preventDefault();
        if (!newPlanName.trim()) {
            setError('Назва плану не може бути порожньою.');
            return;
        }
        if (!currentUser) {
            setError('Користувач не увійшов для додавання плану.');
            return;
        }

        try {
            setError('');
            const newPlanData = {
                name: newPlanName,
                description: newPlanDescription,
            };
            const newPlanId = await addPlanner(currentUser.uid, newPlanData);

            // Оновлюємо стан локально, щоб уникнути повторного запиту до Firestore
            setPlanners(prevPlanners => [
                { id: newPlanId, ...newPlanData, createdAt: new Date() }, // Враховуємо createdAt для сортування
                ...prevPlanners
            ].sort((a, b) => b.createdAt - a.createdAt)); // Пересортовуємо, щоб новий план був зверху

            setNewPlanName('');
            setNewPlanDescription('');
        } catch (err) {
            console.error("Помилка додавання плану:", err);
            setError('Не вдалося додати план. ' + err.message);
        }
    };

    const handleDeletePlan = async (plannerId) => {
        if (!currentUser) {
            setError('Користувач не увійшов для видалення плану.');
            return;
        }

        try {
            setError('');
            await deletePlanner(currentUser.uid, plannerId);
            // Видаляємо план зі стану локально
            setPlanners(prevPlanners => prevPlanners.filter(plan => plan.id !== plannerId));
        } catch (err) {
            console.error("Помилка видалення плану:", err);
            setError('Не вдалося видалити план. ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p>Завантаження ваших планів...</p>
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
            <div className="auth-card" style={{ maxWidth: '800px', width: '100%' }}>
                <h2 className="text-2xl text-[#3b5e4c] mb-6 font-semibold">Ваші Плани</h2>

                {/* Форма для додавання нового плану */}
                <form onSubmit={handleAddPlan} className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-xl font-semibold mb-3">Додати новий план</h3>
                    <div className="mb-3">
                        <label htmlFor="planName" className="block text-sm font-medium text-gray-700">Назва плану:</label>
                        <input
                            type="text"
                            id="planName"
                            value={newPlanName}
                            onChange={(e) => setNewPlanName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Наприклад: План на тиждень"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="planDescription" className="block text-sm font-medium text-gray-700">Опис (необов'язково):</label>
                        <textarea
                            id="planDescription"
                            value={newPlanDescription}
                            onChange={(e) => setNewPlanDescription(e.target.value)}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Деталі вашого плану..."
                        ></textarea>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-[#3a9a5c] text-white rounded-md hover:bg-[#2f7d4a] focus:outline-none focus:ring-2 focus:ring-[#3a9a5c] focus:ring-offset-2">
                        Додати план
                    </button>
                </form>

                {/* Список планів */}
                {planners.length === 0 ? (
                    <p className="text-gray-600">У вас поки немає планів. Додайте перший!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {planners.map((plan) => (
                            <div key={plan.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-[#3b5e4c]">{plan.name}</h4>
                                    {plan.description && <p className="text-gray-700 text-sm mt-1">{plan.description}</p>}
                                    <p className="text-gray-500 text-xs mt-2">
                                        Створено: {plan.createdAt?.seconds ? new Date(plan.createdAt.seconds * 1000).toLocaleDateString() : '—'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDeletePlan(plan.id)}
                                    className="mt-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 self-end"
                                >
                                    Видалити
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPlans;