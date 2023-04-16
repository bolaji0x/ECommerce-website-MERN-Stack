import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { Link } from 'react-router-dom';


const Orders = ({_id, createdBy, total, status, createdAt,}) => {

  const formatDate = (date) => {
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
    const day = String(new Date(date).getDate()).padStart(2, '0');
    const year = new Date(date).getFullYear();
    return `${month}.${day}.${year}`
  }

  
  return (
    <>
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
  </>
               
              
    
  )
}

export default Orders