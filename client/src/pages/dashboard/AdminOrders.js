import React from 'react'
import { Orders } from '../../components'

const AdminOrders = () => {
  return (
    <section className='bd-container'>
        <div className='order-head-title'>
          <h1 className='page-title'>Order</h1>
          <button className='create-order-btn'>Create new</button>
        </div>
        <Orders />
    </section>
  )
}

export default AdminOrders