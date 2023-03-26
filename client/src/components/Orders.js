import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

const Orders = ({_id, createdBy, orderItems, total, status, createdAt}) => {

  const formatDate = (date) => {
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
    const day = String(new Date(date).getDate()).padStart(2, '0');
    const year = new Date(date).getFullYear();
    return `${month}.${day}.${year}`
  }

  
  return (
                  <>
                    <tbody key={_id}  className='order-content'>
                      <td className='order-atext lhtc'>{_id.substring(0,3)}</td>
                      <td className='order-btext lhtc'>{createdBy.username} {createdBy.lastName}</td>
                      <td className='order-atext'>₦ {total}</td>
                      <td><button className='status-btn'>{status}</button></td>
                      <td className='order-atext'>{formatDate(createdAt)}</td>
                      <td><button><BiDotsHorizontalRounded className='order-dots' /></button></td>
                  </tbody>
                  </>
               
              
    
  )
}

export default Orders