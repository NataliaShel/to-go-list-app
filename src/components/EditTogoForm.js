import React, {useState} from 'react'

export const EditTogoForm = ({editTogo, task}) => {
    const[value, setValue] = useState(task.task)

    const handleSubmit =e => {
      e.preventDefault();

      editTogo(value, task.id)

      setValue("")


    }
  return (
    <form className='TogoForm' onSubmit={handleSubmit}>
      <input type="text" className='togo-input' value={value} placeholder='Update Task' onChange={(e) => setValue(e.target.value)}/>
      <button type='submit' className='togo-btn'>Update Task</button>
    </form>
  )
}
