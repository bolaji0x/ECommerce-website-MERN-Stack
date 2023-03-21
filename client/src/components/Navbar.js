import React, { useEffect, useState } from 'react'
import { FaAd } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AiOutlineMenu  } from "react-icons/ai";
import { BiX, BiCart, BiBox } from "react-icons/bi";
import { useAppContext } from '../context/appContext';
import items from './menu'
import CartContainer from './CartContainer';
const allCategories = ['all', ...new Set(items.map((item) => item.category))];
const Navbar = () => {
    const { toggleSidebar, showSidebar, amount, toggleCart, getProducts, cart} = useAppContext()
    const [categories, setCategories] = useState(allCategories);

    
    useEffect(() => {
        setCategories(allCategories)
        
    }, [])
  return (
    <>
    <div className='home-navs'>
        <header className='hn-header'>
            <nav className='hn-container'>
            
                <h1 className='hn-title'>Konga</h1>
                <ul className='hn-list'>
                    <li><Link className='eachn-link'>Store Location</Link></li>
                    <li><Link className='eachn-link'>Sell on Konga</Link></li>
                    <li><Link className='eachn-link'>Help</Link></li>
                    <li><Link to='/' className='eachn-link'>Login / Signup</Link></li>
                </ul>
                <button onClick={toggleCart} className='hb-btn'>
                    <BiCart className='hn-icon' />
                    <h4 className='hn-text'>My Cart</h4>
                    <p className='hn-amount'>{cart.length}</p>
                </button>
                <CartContainer />
            </nav>
            <div className='mobilenavbtn-cont'>
                
                <button onClick={toggleSidebar}>{!showSidebar ? <AiOutlineMenu className='hn-sidebarbtn' /> : <BiX className='hn-sidebarbtn hxbtn' />}</button>
                <div className='mobilebtn-cont'>
                    <button><BiBox className='mobilenavbtn' /></button>
                    <button onClick={toggleCart}><BiCart className='mobilenavbtn' /></button>
                </div>
            </div>
        </header>

        <div className={!showSidebar ? 'sh-container' : 'sh-container showsh'}>
            <div className='sh-content'>
                <div className='lsbtn-container'>
                    <button className='ls-btn'><Link className='ls-link' to='/'>Login</Link></button>
                    <button className='ls-btn'><Link className='ls-link' to='/'>Signup</Link></button>
                </div>
                <ul className='sh-list'>
                    {categories.map((category, index) => {
            
                    return (
                        <li key={index} className='eachs-li'><Link className='eachs-link'>{category}</Link></li>
                    )
                    
                    })}
                    
                </ul>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Navbar