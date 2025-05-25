import React, {useState} from 'react'

export const TogoForm = ({addTogo}) => {
    const[value, setValue] = useState("")

    const handleSubmit = e => {
  e.preventDefault();

  if (value.trim() === "") return; 

  addTogo(value);
  setValue("");
}

  return (
    <form className='TogoForm' onSubmit={handleSubmit}>
      <input type="text" className='togo-input' value={value} placeholder='What is the task today?' onChange={(e) => setValue(e.target.value)}/>
      <button type='submit' className='togo-btn'>AddTask</button>
    </form>
  )
}
