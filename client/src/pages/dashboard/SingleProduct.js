import React from 'react'
import { Navbar, SingleProductDetail } from '../../components'
const SingleProduct = () => {
  return (
    <>
        <Navbar />
    
    <div className='homeproducts-container'>
        <h3 className='hp-title'>Home</h3>
        <SingleProductDetail />
    </div>
    </>
  )
}

export default SingleProduct