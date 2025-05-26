// src/firebase/firestore.js
import { db } from './firebase';
import { collection, getDocs, doc, addDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';

/**
 * Отримує всі документи з колекції користувачів у Firestore.
 * Використовується AdminPanel.
 * @returns {Array} Масив об'єктів користувачів, кожен з яких містить 'id' (UID) та інші дані.
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
 * Додає новий план на глобальному рівні (не в підколекції).
 * @param {string} userId - UID користувача.
 * @param {object} planData - Об'єкт з даними плану.
 * @returns {string} ID новоствореного документа плану.
 */
export const addPlanner = async (userId, planData) => {
    try {
        const plannersCollectionRef = collection(db, 'planners');
        const docRef = await addDoc(plannersCollectionRef, {
            ...planData,
            userId,
            createdAt: new Date()
        });
        return docRef.id;
    } catch (error) {
        console.error("Помилка при додаванні плану:", error);
        throw error;
    }
};

/**
 * Отримує всі плани з глобальної колекції planners для конкретного користувача.
 * @param {string} userId - UID користувача.
 * @returns {Array} Масив об'єктів планів.
 */
export const getPlannersByUserId = async (userId) => {
    try {
        const plannersCollectionRef = collection(db, 'planners');
        const q = query(plannersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        console.log('Кількість планів користувача ${userId}:', querySnapshot.size);
        const planners = [];
        querySnapshot.forEach((doc) => {
            planners.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Локальне сортування за createdAt (якщо є)
        planners.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() ?? new Date(0);
            const dateB = b.createdAt?.toDate?.() ?? new Date(0);
            return dateB - dateA; // від новіших до старіших
        });

        return planners;
    } catch (error) {
        console.error('Помилка при отриманні планів для користувача ${userId}:', error);
        throw error;
    }
};

/**
 * Видаляє план за його ID з глобальної колекції planners.
 * @param {string} plannerId - ID документа плану.
 */
export const deletePlanner = async (plannerId) => {
    try {
        const plannerDocRef = doc(db, 'planners', plannerId);
        await deleteDoc(plannerDocRef);
    } catch (error) {
        console.error(`Помилка при видаленні плану ${plannerId}:`, error);
        throw error;
    }
};