import React from 'react'

const FormRow = ({ type, name, labelText, value, handleChange}) => {
  return (
    <div className='form-row'>
      <div className='form-item'>
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          required
          className='form-input'
        />
        <label htmlFor={name} className="form-label">{labelText || name}</label>
      </div>
    </div>
  )
}

export default FormRow