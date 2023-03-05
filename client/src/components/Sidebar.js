import React, { useState } from 'react'
import Logo from './Logo'
import { BiBarChart, BiBox, BiCartAlt, BiChevronDown, BiCommentDots, BiGlobe, BiPaint, BiPurchaseTagAlt, BiSidebar, BiUser, BiWallet, BiX } from "react-icons/bi";
import { FaRegSun } from "react-icons/fa";
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const { showSidebar,  toggleSidebar} = useAppContext()
  const [showItems, setShowItems] = useState(false)
  return (
    <>
      <aside className={
          !showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }>
        <div className='sidebar-head'>
          <div className='sidebar-img'><Logo /></div>
          <button onClick={toggleSidebar}><BiX className='close-btn' /></button>
        </div>
        
          
          <div className='sidebar-content'>
            <div className='each-sidebar active-sidebar'>
              <button><BiSidebar className='active-sidebar-btn sidebar-btn' /></button>
              <Link className='eachs-name active-sidebarname'>Dashboard</Link>
            </div>


            
            <div className='each-sidebar'>
                <div className='eachs-grid'>
                  <div>
                    <button><BiBox className='sidebar-btn' /></button>

                    <label className='eachs-name'>Products</label>
                  
                    <button onClick={() => setShowItems(!showItems)}><BiChevronDown className='inv-btn sidebar-btn' /></button>
                </div>
                
                {!showItems && (
                  <div className='sidebar-sublinks'>
                  <Link className='each-sublink' to='/add-product'>Add product</Link>
                  <Link className='each-sublink' to='/all-products'>Product list</Link>
                  <Link className='each-sublink' to='/'>Categories</Link>
                  <Link className='each-sublink' to='/'>Brands</Link>
                </div>
                )}
                
            </div>
            </div>


            <div className='each-sidebar'>
              <div className='eachs-flex'>
                <button><BiCartAlt className='sidebar-btn' /></button>
                <Link className='eachs-name'>Orders</Link>
              </div>
              <button><BiChevronDown className='inv-btn sidebar-btn' /></button>
            </div>
            <div className='each-sidebar'>
              <div className='eachs-flex'>
                <button><BiUser className='sidebar-btn' /></button>
                <Link className='eachs-name'>Customers</Link>
              </div>
              <button><BiChevronDown className='inv-btn sidebar-btn'  /></button>
            </div>
            <div className='each-sidebar'>
              <button><BiBarChart className='sidebar-btn' /></button>
              <Link className='eachs-name'>Statistics</Link>
            </div>
            <div className='each-sidebar'>
              <button><BiCommentDots className='sidebar-btn' /></button>
              <Link className='eachs-name'>Reviews</Link>
            </div>
            <div className='each-sidebar'>
              <button><BiWallet className='sidebar-btn' /></button>
              <Link className='eachs-name'>Transactions</Link>
            </div>
            <div className='each-sidebar'>
              <button><BiGlobe className='sidebar-btn' /></button>
              <Link className='eachs-name'>Sellers</Link>
            </div>
            <div className='each-sidebar'>
              <button><BiPurchaseTagAlt className='sidebar-btn' /></button>
              <Link className='eachs-name'>Hot offers</Link>
            </div>

            <div className='btn-sidebar'>
              <div className='each-sidebar'>
                <div className='eachs-flex'>
                  <button><BiPaint className='sidebar-btn' /></button>
                  <Link className='eachs-name'>Appearance</Link>
                </div>
                <button><BiChevronDown className='inv-btn sidebar-btn' /></button>
              </div>
              <div className='each-sidebar'>
                <button><FaRegSun className='sidebar-btn' /></button>
                <Link className='eachs-name'>Settings</Link>
            </div>
            </div>
          </div>
      </aside>
    </>
  )
}

export default Sidebar