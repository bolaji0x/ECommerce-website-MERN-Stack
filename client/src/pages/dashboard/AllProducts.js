import React from 'react'
import { ProductContainer, Navbar } from '../../components'
const AllProducts = () => {
  return (
    <>
      <Navbar />
      <div className='homeproducts-container'>
        <h3 className='hp-title'>Home</h3>
        <ProductContainer />
      </div>
    </>
  )
}

export default AllProducts