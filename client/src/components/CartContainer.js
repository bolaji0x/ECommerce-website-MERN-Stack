import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { BiX } from 'react-icons/bi'
import CartItem from './CartItem'

const CartContainer = () => {
  const { showCart, toggleCart, cart, clearCart, total } = useAppContext()
    
  return (
    <aside className={
        !showCart ? 'cart-item-container' : 'cart-item-container show-cart-item '
      }>
        <header className='ci-header'>
            <h1 className='ci-title'>Cart Overview</h1>
            <button onClick={toggleCart} className='cart-btn'>
              <BiX className='cart-icon' /> 
              <label>Close</label>
            </button>
          </header>

          <div>
            {cart?.map((item) => {
              return (<CartItem key={item._id} {...item} />)
            })}
            </div>


          <footer className='cart-total-cont'>
            <div className='ct-texts'>
              <h2 className='subtotal'>Subtotal</h2>
              <h2 className='subtotal'>₦ {total}</h2>
            </div>
            <button type='button' onClick={clearCart} className='checkout-btn'>Checkout</button>
          </footer>
    </aside>
  )
}

export default CartContainer

