import React, { useEffect } from 'react'
import { BiCartAlt, BiShoppingBag, BiDotsHorizontalRounded } from "react-icons/bi";
import { useAppContext } from '../context/appContext';
const Dashboard = () => {
    const {orders, totalOrders, totalProducts, getOrders, getUserProducts} = useAppContext()

    const totalOrderPrice = orders.reduce((total, item) => {
        return total + item.total;
    }, 0);

    const formatDate = (date) => {
        const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
        const day = String(new Date(date).getDate()).padStart(2, '0');
        const year = new Date(date).getFullYear();
        return `${month}.${day}.${year}`
      }
    

    useEffect(() => {
        getOrders()
        getUserProducts()
        // eslint-disable-next-line
    }, [])
  return (
    <>
        <div className='dashboard-container'>
            <h1 className='page-title'>Dashboard</h1>
            <div className='dash-head'>
                <div className='dlh-flex'>
                    <button className='dollar-btn'>₦</button>
                    <div className='dlh-grid'>
                        <label className='dlh-name'>Total Sales</label>
                        <p className='dlh-price'>₦ {totalOrderPrice.toLocaleString()}</p>
                    </div>
                </div>

                <div className='dlh-flex'>
                    <button className='dlh-cart-btn'><BiCartAlt /></button>
                    <div className='dlh-grid'>
                        <label className='dlh-name'>Total Orders</label>
                        <p className='dlh-price'>{totalOrders}</p>
                    </div>
                </div>

                <div className='dlh-flex'>
                    <button className='bag-icon'><BiShoppingBag /></button>
                    <div className='dlh-grid'>
                        <label className='dlh-name'>Total Products</label>
                        <p className='dlh-price'>{totalProducts}</p>
                    </div>
                </div>
            </div>


            <div className='form-section oder-section'>
                <h1 className='page-title'>Latest Orders</h1>
                    <table className='order-table od-table'>
                    {orders.map((order) => {
                        const {_id, createdBy, total, status, createdAt} = order
                    return (
                        <>
                            <tbody key={_id}  className='order-content'>
                                <td className='order-atext lhtc'>{_id.substring(0,3)}</td>
                                <td className='order-btext lhtc'>{createdBy.username} {createdBy.lastName}</td>
                                <td className='order-atext'>{createdBy.email}</td>
                                <td className='order-atext'>₦ {total.toLocaleString()}</td>
                                <td><button className='status-btn'>{status}</button></td>
                                <td className='order-atext'>{formatDate(createdAt)}</td>
                                <td><button><BiDotsHorizontalRounded className='order-dots' /></button></td>
                            </tbody>
                        </>
                    )
                })}
                </table>
                
                {/*
                <div className='order-box'>
                    <div className='each-obox'>
                        <div className='lh-obox'>
                            <p className='order-ltext order-id'>2273</p> 
                            <p className='order-ltext'>Devon lane</p>   
                        </div>
                        <div className='rh-obox'>
                            <p className='order-rtext order-email'>devon@example.com</p>
                            <p className='order-rtext'>₦ 878.35</p>
                            <button className='order-btn order-rtext'>Delivered</button>
                            <p className='order-rtext'>07.05.2020</p>
                            <BiDotsVertical className='order-rtext' />
                        </div>
                        
                    </div>
                </div>

                */}
            </div>
        </div>
    </>
  )
}

export default Dashboard