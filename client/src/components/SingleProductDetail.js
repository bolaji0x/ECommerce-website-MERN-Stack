import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppContext } from '../context/appContext'

const SingleProductDetail = () => {
    const {id} = useParams()
    const {
        isLoading, 
        product, 
        getSingleProduct
    } = useAppContext()

    useEffect(() => {
        getSingleProduct(id) 
        // eslint-disable-next-line 
    }, [])
    if (!product) {
        return <h1 className='no-post'>Product Not Found</h1>
    } else {
        const {title, description, images} = product
        return (
            <>
                
                    <div className='hpd-content'>
                        <div><img className='hpd-img' alt={title} src={images[0].url} /></div>
                        <div className='hbd-texts'>
                            <h2 className='hpd-title'>{title}</h2>
                            <p className='hpd-desc'><span className='hpd-dtitle'>Description: </span>{description}</p>
                            <p className='hpd-ash-text'>Product Code:<span className='hpd-black-text'> 59556797</span></p>
                            <p className='hpd-ash-text'>Brand: <span className='hpd-black-text'> Hisense</span></p>
                            <h3 className='hpd-price'>N140,490</h3>
                            <div className='qty-cont'>
                                <p className='qty-text'>Quantity:</p>
                                <div className='amtbtn-container'>
                                    <button className='amtbtn'>-</button>
                                    <p className='amt-text amtbtn'>1</p>
                                    <button className='amtbtn'>+</button>
                                </div>
                            </div>
        
                            <button disabled={isLoading}  className='buy-btn'>Buy Now</button>
                        </div>
                    </div>
                
            </>
          )
    } 
  
}

export default SingleProductDetail