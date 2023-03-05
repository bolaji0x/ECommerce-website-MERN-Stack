import React from 'react'
import { ProductContainer } from '../../components'
const AllProducts = () => {
  return (
    <>
      <section className='list-container'>
        <h1 className='page-title'>Products list</h1>
        <div className='list-content'>
          <div className='pl-head ca'>
            <input
              type='Search'
              placeholder='Search'
              className='pl-input'
            />
            <div className='plhead-right'>
              <button className='sort-btn'>Last added</button>
            </div>
          </div>

          <ProductContainer />

          
        </div>
      </section>
    </>
  )
}

export default AllProducts