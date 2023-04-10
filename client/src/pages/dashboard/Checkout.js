import React from 'react'
import { Navbar, CheckoutContainer } from '../../components'
const Checkout = () => {
  return (
    <>
      <Navbar />
      <div className='homeproducts-container'>
        <h3 className='hp-title'>Checkout</h3>
        <CheckoutContainer />
      </div>
    </>
  )
}

export default Checkout