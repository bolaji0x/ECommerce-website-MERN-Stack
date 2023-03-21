import React from 'react'
import { BiHeart, BiXCircle } from 'react-icons/bi'
import { useAppContext } from '../context/appContext'
const CartItem = ({_id, title, images, price, amount}) => {
  const { removeItemFromCart } = useAppContext()
  return (
    <>

          

          <div className='cart-item-content' key={_id}>
            <div className='carti-flex'>
              <img src={images[0].url} alt={title} className='cart-item-img' />
              <div className='carti-grid'>
                <h3 className='ci-name'>{title}</h3>
                <p className='ci-price'>N{price}</p>
              </div>
            </div>

            <div className='cart-btns-container'>
              <div className='cart-mplus'>
                <button type='button'  className='cminus-btn cmp-btn'>-</button>
                <p className='camount-btn cmp-btn'>{amount}</p>
                <button type='button'  className='cplus-btn cmp-btn'>+</button>
              </div>
              <div className='cart-sr'>
                <div className='cart-btn'>
                  <BiHeart className='cart-icon' /> 
                  <label className='ci-label'>Save for later</label>
                </div>
                <div className='cart-btn rmv-btn'>
                  <BiXCircle className='cart-icon' />
                  <button type='button' onClick={() => removeItemFromCart(_id)} className='ci-label'>Remove item</button>
                </div>
              </div>
            </div>
          </div>

          
        
    </>
  )
}

export default CartItem