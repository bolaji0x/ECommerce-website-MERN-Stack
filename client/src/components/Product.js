import React from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

const Product = ({_id, title, price, images }) => {
  const { addItemToCart } = useAppContext()
  
  return (
    <>

                <div className='each-product' key={_id}>
                    
                    <Link to={`/product/${_id}`}><img className='ep-img' src={images[0].url} alt={title} /></Link>
                    
                    <div className='ep-texts'>
                        <p className='ep-title'>{title}</p>
                        <h3 className='ep-price'>N {price}</h3>
                        <button onClick={() =>addItemToCart(_id)} type='button'  className='ep-btn'>Add To Cart</button>
                    </div>
                </div>
                
            
        
    </>
  )
}

export default Product