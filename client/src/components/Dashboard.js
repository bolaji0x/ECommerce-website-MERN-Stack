import React, { useEffect } from 'react'
import { BiCartAlt, BiShoppingBag, BiDotsHorizontalRounded } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
const Dashboard = () => {
    const {orders, totalOrders, totalProducts, getAdminOrders, getUserProducts} = useAppContext()

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
        getAdminOrders()
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


            <div className='latest-order-section'>
                <h1 className='page-title'>Latest Orders</h1>
                    <table className='order-table od-table'>
                    {orders.map((order) => {
                        const {_id, createdBy, total, status, createdAt} = order
                    return (
                        <tbody key={_id}  className='order-content'>
                        <tr>
                          <td className='order-atext lhtc'><Link className='order-link' to={`/order/${_id}`}>{_id.substring(0,3)}</Link></td>
                          <td className='order-btext lhtc'><Link className='order-link' to={`/order/${_id}`}>{createdBy.username} {createdBy.lastName}</Link></td>
                          <td className='order-atext'><Link className='order-link' to={`/order/${_id}`}>₦ {total}</Link></td>
                          <td><Link><button className='status-btn'>{status}</button></Link></td>
                          <td className='order-atext'><Link className='order-link' to={`/order/${_id}`}>{formatDate(createdAt)}</Link></td>
                          <td><button><BiDotsHorizontalRounded className='order-dots' /></button></td>
                        </tr>
                      </tbody>
                        
                        
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