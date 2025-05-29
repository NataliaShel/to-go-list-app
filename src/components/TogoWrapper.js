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

  useEffect(() => {
    const fetchPlanners = async () => {
      if (userLoggedIn && currentUser?.uid) {
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
          console.error("Error loading plans:", error);
        }
      } else {
        const storedTogos = localStorage.getItem("guest_togos");
        if (storedTogos) {
          setTogos(JSON.parse(storedTogos));
        }
      }
    };

    fetchPlanners();
  }, [userLoggedIn, currentUser]);

  const saveToLocalStorage = (newTogos) => {
    localStorage.setItem("guest_togos", JSON.stringify(newTogos));
  };

  const addTogo = async (taskText) => {
    const tempId = uuidv4();
    const newTogo = {
      id: tempId,
      task: taskText,
      completed: false,
      isEditing: false,
    };

    if (userLoggedIn && currentUser?.uid) {
      setTogos(prev => [...prev, newTogo]);

      try {
        const plannerId = await addPlanner(currentUser.uid, {
          name: taskText,
          completed: false,
        });

        setTogos(prev =>
          prev.map(togo =>
            togo.id === tempId ? { ...togo, id: plannerId } : togo
          )
        );
      } catch (error) {
        console.error("Error adding to Firestore:", error);
      }
    } else {
      const updated = [...togos, newTogo];
      setTogos(updated);
      saveToLocalStorage(updated);
    }
  };

  const toggleComplete = async (id) => {
    const togo = togos.find(t => t.id === id);
    if (!togo) return;

    const newStatus = !togo.completed;

    if (userLoggedIn) {
      try {
        await updatePlanner(id, { completed: newStatus });
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }

    const updated = togos.map(togo =>
      togo.id === id ? { ...togo, completed: newStatus } : togo
    );
    setTogos(updated);
    if (!userLoggedIn) saveToLocalStorage(updated);
  };

  const deleteTogo = async (id) => {
    if (userLoggedIn) {
      try {
        await deletePlanner(id);
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }

    const updated = togos.filter(togo => togo.id !== id);
    setTogos(updated);
    if (!userLoggedIn) saveToLocalStorage(updated);
  };

  const editTogo = (id) => {
    setTogos(prev =>
      prev.map(togo =>
        togo.id === id ? { ...togo, isEditing: !togo.isEditing } : togo
      )
    );
  };

  const editTask = async (newTaskText, id) => {
    if (userLoggedIn) {
      try {
        await updatePlanner(id, { name: newTaskText });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }

    const updated = togos.map(togo =>
      togo.id === id ? { ...togo, task: newTaskText, isEditing: false } : togo
    );
    setTogos(updated);
    if (!userLoggedIn) saveToLocalStorage(updated);
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