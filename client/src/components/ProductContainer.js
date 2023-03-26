import React, { useEffect } from 'react'
import Product from './Product'
import {Loading} from '.'
import { useAppContext } from '../context/appContext'

const ProductContainer = () => {
    const {isLoading, products, page, getProducts} = useAppContext()


    useEffect(() => {
      getProducts()
      // eslint-disable-next-line
    }, [page])
  
    
    if(isLoading) {
      return (<Loading />)
    }
  
    if(products.length === 0) {
      return (
      <div className='refresh-btn'>
        <button className='refresh-discover' onClick={() => getProducts()}>Refresh Page</button>
      </div>
      )
    }
    
    return (
      <>
      <div className='hp-content'>
        {products.map((product) => {
          return (<div key={product._id} className='pl-div'><Product key={product._id} {...product} /></div>)
        })}
      </div>
      
      </>
    )
}

export default ProductContainer