import React from 'react'
import { useAppContext } from '../context/appContext'

import CheckoutDetail from './CheckoutDetail'
const CheckoutContainer = () => {
  const { createOrder } = useAppContext()
  return (
    <>
      <div className='checkout-container'>
        <header className='cc-header'>
          <h1 className='cch-title'>ORDER DETAILS</h1>
          <button className='cch-button'>Modify Cart</button>
        </header>

        <CheckoutDetail />

        <div className='subtotal-cont'>
          <h3 className='subtotal-text'>Subtotal</h3>
          <h3 className='subtotal-text'>N7,500</h3>
        </div>
        <div className='total-cont'>
          <h3 className='total-text'>Total</h3>
          <h3 className='total-text'>N7,500</h3>
        </div>

        <button type='button' onClick={createOrder} className='checkout-btn cc-btn'> Continue to Checkout</button>
        
      </div>
    </>
  )
}

export default CheckoutContainer