import React from 'react'
import { BiPencil, BiTrashAlt } from "react-icons/bi";
const Product = ({images, title, description, category, price}) => {
  return (
    <div className='each-pl'>
     <img className='pl-img' src={images[0].url} alt={title} />
        <div className='eachpl-content'>
            <h3 className='pl-title'>{title}</h3>
            <p className='pl-price'>${price}.00</p>      
            <div className='plbtn-container'>
                  <button className='pl-btn'>
                    <BiPencil className='edit-icon' />
                    <label>Edit</label>
                  </button>
                  <button className='pl-btn del-btn'>
                    <BiTrashAlt className='del-icon' />
                    <label>Delete</label>
                  </button>
                </div>
              </div>
    </div>       
                  
  )
}

export default Product