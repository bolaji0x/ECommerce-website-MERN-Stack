import React from 'react'
import { ProductContainer, Navbar, PageBtnContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
const AllProducts = () => {
  const { numOfPages } = useAppContext()
  return (
    <>
      <Navbar />
      <div className='homeproducts-container'>
        <h3 className='hp-title'>Home</h3>
        <ProductContainer />
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </>
  )
}

export default AllProducts