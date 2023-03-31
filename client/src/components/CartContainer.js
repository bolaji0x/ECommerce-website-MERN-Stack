import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import { BiX } from 'react-icons/bi'
import CartItem from './CartItem'
import { PaystackButton } from 'react-paystack';


const CartContainer = () => {
  const { showCart, toggleCart, cart, total, createOrder } = useAppContext()
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const amount = total;
  const [email, setEmail] = useState('testUser@test.com');
  const [name, setName] = useState('testUser');
  const [phone, setPhone] = useState('08000000000');

  const resetForm = () => {
    setEmail('');
    setName('');
    setPhone('');
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: 'Checkout with Paystack',
    onSuccess: ({ reference }) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
      resetForm();
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  if (cart.length === 0) {
    return (
      <section className={
        !showCart ? 'cart-item-container' : 'cart-item-container show-cart-item '
      }>
        {/* cart header */}
        <header className='ci-header'>
            <h1 className='ci-title'>Your bag</h1>
            <button onClick={toggleCart} className='cart-btn'>
              <BiX className='cart-icon' /> 
              <label>Close</label>
            </button>
          </header>
        
          <h4 className='empty-cart'> Cart is currently empty</h4>
        
      </section>
    )
  }
    
  
  return (
    <aside className={
        !showCart ? 'cart-item-container' : 'cart-item-container show-cart-item '
      }>
        <header className='ci-header'>
            <h1 className='ci-title'>Cart Overview</h1>
            <button onClick={toggleCart} className='cart-btn'>
              <BiX className='cart-icon' /> 
              <label>Close</label>
            </button>
          </header>

          <div>
            
            {cart?.map((item) => {
              return (<CartItem key={item._id} {...item} />)
            })}
            </div>


          <footer className='cart-total-cont'>
            <div className='ct-texts'>
              <h2 className='subtotal'>Subtotal</h2>
              <h2 className='subtotal'>₦ {total}</h2>
            </div>
            
            <button type='button' onClick={createOrder} className='checkout-btn'> Test Create Order</button>
            
            
            {/*
            <PaystackButton {...componentProps} className='checkout-btn' />

            */}
          
          </footer>
    </aside>
  )
}

export default CartContainer

