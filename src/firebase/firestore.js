// src/firebase/firestore.js
import { db } from './firebase';
import { collection, getDocs, doc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore'; // Додаємо addDoc, deleteDoc, query, orderBy

/**
 * Отримує всі документи з колекції користувачів у Firestore.
 * Використовується AdminPanel.
 * @returns {Array} Масив об'єктів користувачів, кожен з яких містить 'id' (UID) та інші дані.
 * @throws {Error} Викидає помилку, якщо виникла проблема при отриманні даних.
 */
export const getAllUsersData = async () => {
    try {
        const usersCollectionRef = collection(db, 'user');
        const querySnapshot = await getDocs(usersCollectionRef);

        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return users;
    } catch (error) {
        console.error("Помилка при отриманні даних користувачів з Firestore:", error);
        throw error;
    }
};

/**
 * Додає новий план для конкретного користувача.
 * @param {string} userId - UID користувача.
 * @param {object} planData - Об'єкт з даними плану (наприклад, { name: "...", description: "..." }).
 * @returns {string} ID новоствореного документа плану.
 * @throws {Error} Викидає помилку, якщо виникла проблема.
 */
export const addPlanner = async (userId, planData) => {
    try {
        // Посилання на підколекцію 'planners' всередині документа користувача
        const plannersCollectionRef = collection(db, 'user', userId, 'planners');
        const docRef = await addDoc(plannersCollectionRef, {
            ...planData,
            createdAt: new Date() // Додаємо мітку часу створення автоматично
        });
        return docRef.id;
    } catch (error) {
        console.error("Помилка при додаванні плану:", error);
        throw error;
    }
};

/**
 * Отримує всі плани для конкретного користувача.
 * @param {string} userId - UID користувача.
 * @returns {Array} Масив об'єктів планів.
 * @throws {Error} Викидає помилку, якщо виникла проблема.
 */
export const getPlannersByUserId = async (userId) => {
    try {
        const plannersCollectionRef = collection(db, 'user', userId, 'planners'); // Використовуємо plannersCollectionRef
        // Запит для отримання всіх планів, сортованих за датою створення
        const q = query(plannersCollectionRef, orderBy("createdAt", "desc")); // Сортування за датою створення (від нових до старих)
        const querySnapshot = await getDocs(q);

        const planners = [];
        querySnapshot.forEach((doc) => {
            planners.push({
                id: doc.id, // ID документа плану
                ...doc.data()
            });
        });
        return planners;
    } catch (error) {
        console.error(`Помилка при отриманні планів для користувача ${userId}:`, error);
        throw error;
    }
};

/**
 * Видаляє план за його ID для конкретного користувача.
 * @param {string} userId - UID користувача, якому належить план.
 * @param {string} plannerId - ID документа плану, який потрібно видалити.
 * @throws {Error} Викидає помилку, якщо виникла проблема.
 */
export const deletePlanner = async (userId, plannerId) => {
    try {
        const plannerDocRef = doc(db, 'user', userId, 'planners', plannerId);
        await deleteDoc(plannerDocRef);
    } catch (error) {
        console.error(`Помилка при видаленні плану ${plannerId} для користувача ${userId}:`, error);
        throw error;
    }
};