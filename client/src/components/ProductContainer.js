import React, { useEffect } from 'react'
import Product from './Product'
import {Loading} from '.'
import { useAppContext } from '../context/appContext'
import { Link  } from 'react-router-dom'

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
          return (<Link className='pl-link' key={product._id} ><Product key={product._id} {...product} /></Link>)
        })}
      </div>
      
      </>
    )
}

export default ProductContainer