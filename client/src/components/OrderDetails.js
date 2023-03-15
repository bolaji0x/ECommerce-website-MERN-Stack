import React from 'react'
import { BiBus, BiCalendar, BiLocationPlus, BiUserCircle } from 'react-icons/bi'
import { Sidebar, AdminNavbar, TestImg } from '../components'
const OrderDetails = () => {
  return (
    <div className='homepage'>
      <AdminNavbar />
      <Sidebar />
      <section className='bd-container'>
        <div className='order-head-title'>
          <h1 className='page-title'>Order details</h1>
        </div>
        <div className='form-section order-section od-section'>
          <div className='order-search-head od-head'>
            
            <div className='odate-cont'>
                <BiCalendar className='cal-btn' />
                <h3 className='od-date'>Web, Aug 13, 2020, 4:34PM</h3>   
            </div>
            <div className='right-osh'>
              <select className='order-select'>
                <option className='order-option'>Status</option>
              </select>
              <button className='order-dbtn'>Save</button>

            </div>
          </div>
          
          <div className='order-dcontent'>
            <div className='order-dflex'>
                <div>
                    <button className='ou-btn'><BiUserCircle className='ouser-icon' /></button> 
                </div>
                <span>
                    <h4 className='ocontent-title'>Customer</h4>
                    <p className='ocontent-text'>John Alexanddeer</p>
                    <p className='ocontent-text'>alex@gmail.com</p>
                    <p className='ocontent-text'>+988 999 332 333</p>
                    <button className='oc-btn'>View profile</button>
                </span>
            </div>
            <div className='order-dflex'>
                <div>
                    <button className='ou-btn'><BiBus className='ouser-icon' /></button>
                </div>
                <span>
                    <h4 className='ocontent-title'>Customer</h4>
                    <p className='ocontent-text'><span className='octitle'>Shipping</span>: Fargo express</p>
                    <p className='ocontent-text'><span className='octitle'>Payment method</span>: Card card</p>
                    <p className='ocontent-text'><span className='octitle'>Status</span>: Pending</p>
                    <button className='oc-btn'>Download</button>
                </span>
            </div>
            <div className='order-dflex'>
                <div>
                    <button className='ou-btn'><BiLocationPlus className='ouser-icon' /></button>
                </div>
                <span>
                    <h4 className='ocontent-title'>Deliver to</h4>
                    <p className='ocontent-text'><span className='octitle'>City</span>: Tashkentm Uzbekistan</p>
                    <p className='ocontent-text'><span className='octitle'>Street</span>: Beruny 369</p>
                    <p className='ocontent-text'><span className='octitle'>Address</span>: Block A, House 123m Floor 2</p>
                    <button className='oc-btn'>Open map</button>
                </span>
            </div>
          </div>

        <div className='orderb-flex'>
          <div>
            <table className='orderb-table'>
                <thead >
                  <tr className='order-header'>
                    <th className='order-title lhtc'>Product</th>
                    <th className='order-title lhtc'>Quantity</th>
                    <th className='order-title lhtc'>Unit Price</th>
                    <th className='order-title'>Total</th>
                  </tr>         
                </thead>
                
                <tbody className='order-content'>
                  <tr>
                    
                    <td className='order-btext lhtc oc-btn'><TestImg /> Supreme helinox chair one</td>
                    <td className='order-atext lhtc'>2</td>
                    <td className='order-atext'>$43.50</td>
                    <td className='order-atext'>$87.00</td>
                  </tr>
                </tbody>
        
            </table>
              
            <div className='total-content'>
              <div className='bloc'>
                <h3 className='tc-text'><span className='tc-title'>Subtotal</span>$972.35</h3>
                <h3 className='tc-text'><span className='tc-title'>Shipping cost</span>$10.00</h3>
                <h3 className='tc-text'><span className='tc-title'>Subtotal</span>$983.00</h3></div>
            </div>
          </div>

          <div className='pinfo-content'>
                <div>
                    <h3 className='p-info'>Payment info</h3>
                    <p className='pinfo-text'><span  className='pinfot'>Business name</span>: Master Card, inc</p>
                    <p className='pinfo-text'><span className='pinfot'>Phone</span>: +234 1800 000</p>
                </div>
                {/* 
                <div className='note-info'>
                    <label className='ntitle'>Notes</label>
                    <textarea placeholder='Type here' className='ninput'></textarea>
                    <button className='saven-btn' type='submit'>Save note</button>
                </div>
                */}
          </div>
        </div>

        </div>
      </section>
    </div>
  )
}

export default OrderDetails