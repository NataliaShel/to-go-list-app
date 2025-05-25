import React, {useState} from 'react';
import { TogoForm } from './TogoForm'
import { v4 as uuidv4 } from 'uuid';
import { Togo } from './Togo'
import { EditTogoForm } from './EditTogoForm';
import { useAuth } from '../contexts/authContexts';


export const TogoWrapper = () => {
    const [togos, setTogos] = useState([])
    const { customJwt, userLoggedIn } = useAuth();
    const addTogo = togo => {
      setTogos([...togos, {id: uuidv4(), task: togo, completed: false, isEditing: false}]) 
      console.log(togos)
    }

    const toggleComplete = id =>
      setTogos(togos.map(togo => togo.id === id ? {...togo, completed: !togo.completed} : togo ))
    
    const deleteTogo = id => {
      setTogos(togos.filter(togo => togo.id !== id))
    }
    const editTogo = id => 
      setTogos(togos.map(togo => togo.id === id ? {...togo, isEditing: !togo.isEditing} : togo))
    const editTask  = (task, id) => {
      setTogos(togos.map(togo => togo.id === id ?{...togo, task, isEditing: !togo.isEditing} : togo))
    }
  return (
    <div className='TogoWrapper'>
      <h1>Get Things Done!</h1>
      <TogoForm addTogo={addTogo}/>
      {togos.map((togo, index) => (
        togo.isEditing ? (
          <EditTogoForm editTogo={editTask} task={togo}/>
        ) : (
          <Togo task={togo} key={index} toggleComplete={toggleComplete} deleteTogo={deleteTogo} editTogo={editTogo}/>
        )   
      ))}
    </div>
  );
};
