import React from "react"


const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className='form-row-select'>
      <div className='form-row-item'>
        <label htmlFor={name} className=''>
          {labelText || name}
        </label>
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className='form-select'
        >
          {list.map((itemValue, index) => {
            return (
              <option key={index} value={itemValue}>
                {itemValue}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default FormRowSelect

/*

<div className='form-row-select'>
      <div className='form-row-item'>
        <label htmlFor={name} className=''>
          {labelText || name}
        </label>
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className='form-select'
        >
          {list.map((itemValue, index) => {
            return (
              <option key={index} value={itemValue}>
                {itemValue}
              </option>
            )
          })}
        </select>
      </div>
    </div>

*/

/*

return (
    <div className='form-row-select'>
      <div className="form-row-item">
        
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className='form-select'
        >
          <option className="option">option</option>
        </select>
        <label htmlFor={name} className=''>
          label
        </label>
      </div>
    </div>
  )

*/