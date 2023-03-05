import React from 'react'
import { BiCartAlt, BiDotsVertical, BiShoppingBag } from "react-icons/bi";
const Dashboard = () => {
  return (
    <>
        <div className='dashboard-container'>
            <h1 className='page-title'>Dashboard</h1>
            <div className='dash-head'>
                <div className='dlh-flex'>
                    <button className='dollar-btn'>$</button>
                    <div className='dlh-grid'>
                        <label className='dlh-name'>Total Sales</label>
                        <p className='dlh-price'>$16,636,343</p>
                    </div>
                </div>

                <div className='dlh-flex'>
                    <button className='dlh-cart-btn'><BiCartAlt /></button>
                    <div className='dlh-grid'>
                        <label className='dlh-name'>Total Orders</label>
                        <p className='dlh-price'>3290</p>
                    </div>
                </div>

                <div className='dlh-flex'>
                    <button className='bag-icon'><BiShoppingBag /></button>
                    <div className='dlh-grid'>
                        <label className='dlh-name'>Total Products</label>
                        <p className='dlh-price'>322</p>
                    </div>
                </div>
            </div>


            <div className='dashboard-content'>
                <h1 className='page-title'>Latest Orders</h1>
                <div className='order-box'>
                    <div className='each-obox'>
                        <div className='lh-obox'>
                            <p className='order-ltext order-id'>2273</p> 
                            <p className='order-ltext'>Devon lane</p>   
                        </div>
                        <div className='rh-obox'>
                            <p className='order-rtext order-email'>devon@example.com</p>
                            <p className='order-rtext'>$878.35</p>
                            <button className='order-btn order-rtext'>Delivered</button>
                            <p className='order-rtext'>07.05.2020</p>
                            <BiDotsVertical className='order-rtext' />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard