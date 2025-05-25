import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export const Togo = ({ task, toggleComplete, deleteTogo, editTogo }) => {
  return (
    <div className='Togo'>
      <p
        onClick={() => toggleComplete(task.id)}
        className={task.completed ? 'completed' : 'incompleted'}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTogo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTogo(task.id)} />
      </div>
    </div>
  )
}
