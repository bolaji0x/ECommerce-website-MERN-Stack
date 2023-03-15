import React from 'react'
import { BiArrowToBottom, BiDotsHorizontalRounded } from 'react-icons/bi'

const Orders = () => {
  return (
    
      
        <div className='form-section order-section'>
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
                  <th className='order-title'>Price</th>
                  <th className='order-title'>Status</th>
                  <th className='order-title'>Date</th>
                  <th className='order-title'>Action</th>
                </tr>         
              </thead>
              
              <tbody className='order-content'>
                  <td className='order-atext lhtc'>432</td>
                  <td className='order-btext lhtc'>Devon Lane</td>
                  <td className='order-atext'>$948.55</td>
                  <td><button className='status-btn'>pending</button></td>
                  <td className='order-atext'>07.25.22</td>
                  <td><button><BiDotsHorizontalRounded className='order-dots' /></button></td>
              </tbody>
              
            </table>
          </div>
        </div>
      
    
  )
}

export default Orders