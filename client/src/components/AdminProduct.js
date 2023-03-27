import React from 'react'
import { BiPencil, BiTrashAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
const AdminProduct = ({_id, images, title, description, category, price}) => {
  const { deleteProduct } = useAppContext()
  return (
    <div className='each-pl'>
     <Link to={`/product/${_id}`}><img className='pl-img' src={images[0].url} alt={title} /></Link>
        <div className='eachpl-content'>
            <h3 className='pl-title'>{title}</h3>
            <p className='pl-price'>₦{price.toLocaleString()}.00</p>    
            <div className='plbtn-container'>
                  <Link className='editbtn-link' to={`/${_id}/edit-product`}>
                    <button type='button' className='pl-btn'>
                      <BiPencil className='edit-icon' />
                      <label>Edit</label>
                    </button>
                  </Link>
                  <button type='button' onClick={() => deleteProduct(_id)} className='pl-btn del-btn'>
                    <BiTrashAlt className='del-icon' />
                    <label>Delete</label>
                  </button>
                </div>
              </div>
    </div>       
                  
  )
}

export default AdminProduct