import React, { useState, useEffect } from 'react';
import { TogoForm } from './TogoForm';
import { v4 as uuidv4 } from 'uuid';
import { Togo } from './Togo';
import { EditTogoForm } from './EditTogoForm';
import { useAuth } from '../contexts/authContexts';
import {
  getPlannersByUserId,
  addPlanner,
  deletePlanner,
  updatePlanner,
} from '../firebase/firestore';

export const TogoWrapper = () => {
  const [togos, setTogos] = useState([]);
  const { currentUser, userLoggedIn } = useAuth();

  // Завантаження тасків з Firestore
  useEffect(() => {
    const fetchPlanners = async () => {
      if (userLoggedIn && currentUser && currentUser.uid) {
        try {
          const userPlanners = await getPlannersByUserId(currentUser.uid);
          const formatted = userPlanners.map(planner => ({
            id: planner.id,
            task: planner.name,
            completed: planner.completed ?? false,
            isEditing: false,
          }));
          setTogos(formatted);
        } catch (error) {
          console.error("Помилка завантаження планів:", error);
        }
      }
    };

    fetchPlanners();
  }, [userLoggedIn, currentUser]);

  // Додавання таски
  const addTogo = async (taskText) => {
    const newTogo = {
      id: uuidv4(),
      task: taskText,
      completed: false,
      isEditing: false,
    };
    setTogos(prev => [...prev, newTogo]);

    // Збереження у Firestore
    try {
      const plannerId = await addPlanner(currentUser.uid, { name: taskText, completed: false });
      setTogos(prev =>
        prev.map(togo =>
          togo.id === newTogo.id ? { ...togo, id: plannerId } : togo
        )
      );
    } catch (error) {
      console.error("Помилка при додаванні в Firestore:", error);
    }
  };

  // Перемикання виконання
  const toggleComplete = async (id) => {
    const togo = togos.find(t => t.id === id);
    if (!togo) return;

    const newStatus = !togo.completed;

    try {
      await updatePlanner(id, { completed: newStatus });
      setTogos(prev =>
        prev.map(togo =>
          togo.id === id ? { ...togo, completed: newStatus } : togo
        )
      );
    } catch (error) {
      console.error("Помилка оновлення статусу:", error);
    }
  };

  // Видалення
  const deleteTogo = async (id) => {
    try {
      await deletePlanner(id);
      setTogos(prev => prev.filter(togo => togo.id !== id));
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
  };

  // Ввімкнення/вимкнення режиму редагування
  const editTogo = id => {
    setTogos(prev =>
      prev.map(togo =>
        togo.id === id ? { ...togo, isEditing: !togo.isEditing } : togo
      )
    );
  };

  // Редагування тексту таски
  const editTask = async (newTaskText, id) => {
    try {
      await updatePlanner(id, { name: newTaskText });
      setTogos(prev =>
        prev.map(togo =>
          togo.id === id ? { ...togo, task: newTaskText, isEditing: false } : togo
        )
      );
    } catch (error) {
      console.error("Помилка оновлення завдання:", error);
    }
  };

  return (
    <div className='TogoWrapper'>
      <h1>Get Things Done!</h1>
      <TogoForm addTogo={addTogo} />
      {togos.map((togo) =>
        togo.isEditing ? (
          <EditTogoForm key={togo.id} editTogo={editTask} task={togo} />
        ) : (
          <Togo
            key={togo.id}
            task={togo}
            toggleComplete={toggleComplete}
            deleteTogo={deleteTogo}
            editTogo={editTogo}
          />
        )
      )}
    </div>
  );
};
