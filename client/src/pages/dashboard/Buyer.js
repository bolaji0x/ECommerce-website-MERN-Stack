import React from 'react'
import { BuyerProfile, Navbar } from '../../components'
const Buyer = () => {
  return (
    <>
      <Navbar />
      <div className='homeproducts-container'>
        <h3 className='hp-title'>Home</h3>
        <BuyerProfile />
      </div>
    </>
  )
}

export default Buyer