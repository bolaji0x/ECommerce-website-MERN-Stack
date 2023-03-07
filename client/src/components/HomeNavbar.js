import React from 'react'
import { FaAd } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HomeProducts from './HomeProducts'
import { AiOutlineMenu  } from "react-icons/ai";
import { BiX, BiCart, BiBox } from "react-icons/bi";
import { useAppContext } from '../context/appContext';
const HomeNavbar = () => {
    const { toggleSidebar, showSidebar } = useAppContext()
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
                <button className='hb-btn'>
                    <FaAd className='hn-icon' />
                    <h4 className='hn-text'>My Cart</h4>
                    <p className='hn-amount'>0</p>
                </button>
            </nav>
            <div className='mobilenavbtn-cont'>
                
                <button onClick={toggleSidebar}>{showSidebar ? <AiOutlineMenu className='hn-sidebarbtn' /> : <BiX className='hn-sidebarbtn hxbtn' />}</button>
                <div className='mobilebtn-cont'>
                    <button><BiBox className='mobilenavbtn' /></button>
                    <button><BiCart className='mobilenavbtn' /></button>
                </div>
            </div>
        </header>

        <div className={showSidebar ? 'sh-container' : 'sh-container showsh'}>
            <div className='sh-content'>
                <div className='lsbtn-container'>
                    <button className='ls-btn'><Link className='ls-link' to='/'>Login</Link></button>
                    <button className='ls-btn'><Link className='ls-link' to='/'>Signup</Link></button>
                </div>
                <ul className='sh-list'>
                    <li className='eachs-li'><Link className='eachs-link'>All Categories</Link></li>
                    <li className='eachs-li'><Link className='eachs-link'>Computer and Accessories</Link></li>
                    <li className='eachs-li'><Link className='eachs-link'>Phone and Tablets</Link></li>
                    <li className='eachs-li'><Link className='eachs-link'>Electronics</Link></li>
                    <li className='eachs-li'><Link className='eachs-link'>Konga Fashion</Link></li>
                    <li className='eachs-li'><Link className='eachs-link'>Phone and Tablets</Link></li>
                    <li className='eachs-li'><Link className='eachs-link'>Home and Kitchen</Link></li>
                    <li className='eachs-li'><Link className='eachs-link'>Baby Kids and Toys</Link></li>
                    <li className='eachs-li'><Link className='eachs-link'>Other Ctaegories</Link></li>
                </ul>
            </div>
        </div>
    </div>
    <HomeProducts />
    </>
  )
}

export default HomeNavbar