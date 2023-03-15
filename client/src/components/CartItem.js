import React from 'react'
import { BiHeart, BiX, BiXCircle } from 'react-icons/bi'
import { Navbar, TestImg } from '.'
const CartItem = () => {
  return (
    <>
      <Navbar />
      <div className='homeproducts-container'>
        <h3 className='hp-title'>Home</h3>
        <article className='cart-item'>

          <header className='ci-header'>
            <h1 className='ci-title'>Cart Overview</h1>
            <button className='cart-btn'>
              <BiX className='cart-icon' /> 
              <label>Close</label>
            </button>
          </header>

          <div className='cart-item-content'>
            <div className='carti-flex'>
              <TestImg />
              <div className='carti-grid'>
                <h3 className='ci-name'>Luminhgoosbdfshbds 563563b ghdfsgdfdffd - Black</h3>
                <p className='ci-price'>N33, 88</p>
              </div>
            </div>

            <div className='cart-btns-container'>
              <div className='cart-mplus'>
                <button className='cminus-btn cmp-btn'>-</button>
                <p className='camount-btn cmp-btn'>1</p>
                <button className='cplus-btn cmp-btn'>+</button>
              </div>
              <div className='cart-sr'>
                <div className='cart-btn'>
                  <BiHeart className='cart-icon' /> 
                  <label className='ci-label'>Save for later</label>
                </div>
                <div className='cart-btn rmv-btn'>
                  <BiXCircle className='cart-icon' />
                  <label className='ci-label'>Remove item</label>
                </div>
              </div>
            </div>
          </div>

          <div className='cart-total-cont'>
            <div className='ct-texts'>
              <h2 className='subtotal'>Subtotal</h2>
              <h2 className='subtotal'>N 45,000</h2>
            </div>
            <button className='checkout-btn'>Checkout</button>
          </div>
        </article>
      </div>
    </>
  )
}

export default CartItem