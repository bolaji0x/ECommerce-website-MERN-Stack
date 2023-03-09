import React from 'react'
import { Link } from 'react-router-dom'
const Product = ({_id, title, price, images }) => {
  return (
    <>

                <div className='each-product' key={_id}>
                    
                    <Link to={`/product/${_id}`}><img className='ep-img' src={images[0].url} alt={title} /></Link>
                    <div className='ep-texts'>
                        <p className='ep-title'>{title}</p>
                        <h3 className='ep-price'>N {price}</h3>
                        <button className='ep-btn'>Add To Cart</button>
                    </div>
                </div>
                
            
        
    </>
  )
}

export default Product