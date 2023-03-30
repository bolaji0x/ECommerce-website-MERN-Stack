import React, { useEffect } from 'react'
import { BiArrowToBottom} from 'react-icons/bi'
import Orders from './Orders'
import { useAppContext } from '../context/appContext'
const OrderContainer = () => {
  const { orders, getOrders } = useAppContext()

  useEffect(() => {
    getOrders()
    // eslint-disable-next-line
  }, [])


  return (
    <section className='bd-container'>
        <div className='order-head-title'>
          <h1 className='page-title'>Order</h1>
          <button className='create-order-btn'>Create new</button>
        </div>
        

        <div className='orm-section order-section'>
          <div className='order-search-head'>
            <input 
              type='text'
              placeholder='Search'
              className='pl-input'

            />
            <div className='right-osh'>
              <select className='order-select'>
                <option className='order-option'>Status</option>
              </select>
              <button className='order-dbtn'>Date <BiArrowToBottom className='orderd-icon' /></button>

            </div>
          </div>
          <div className='table-container'>
            <table className='order-table'>
              <thead className='order-header'>
                <tr>
                  <th className='order-title lhtc'>ID</th>
                  <th className='order-title lhtc'>Cutomer name</th>
                  <th className='order-title'>Total</th>
                  <th className='order-title'>Status</th>
                  <th className='order-title'>Date</th>
                  <th className='order-title'>Action</th>
                </tr>         
              </thead>
              {orders.map((order) => {
                return (<Orders key={order._id} {...order} />)
              })}
            </table>
          </div>
        </div>
    </section>
  )
}

export default OrderContainer