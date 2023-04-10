import React, { useEffect } from 'react'
import { BiBus, BiCalendar, BiLocationPlus, BiUserCircle } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
const OrderDetails = () => {

  const {id} = useParams()
  const {order, getSingleOrder} = useAppContext()

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    return `${formattedDate.substr(0, 3)}, ${formattedDate.substr(4)}`;
    
  }

  useEffect(() => {
    getSingleOrder(id)
    // eslint-disable-next-line
  }, [])

    if(!order) {
      return (<h1 className='no-order'>No order Found</h1>)
    } else {
      const {createdAt, createdBy, orderItems, total, subtotal, shippingFee} = order
      return (
        <div className='homepage'>
          
          <section className='bd-container'>
            <div className='order-head-title'>
              <h1 className='page-title'>Order details</h1>
            </div>
            
            <div className='orm-section order-section od-section'>
              
              
              <div className='order-search-head od-head'>
                
                <div className='odate-cont'>
                    <BiCalendar className='cal-btn' />
                    
                    <h3 className='od-date'>{formatDate(createdAt)}</h3>   
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
                        <p className='ocontent-text'>{createdBy.firstName} {createdBy.lastName}</p>
                        <p className='ocontent-text'>{createdBy.email}</p>
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
                        <p className='ocontent-text'><span className='octitle'>City</span>: Dummy city Uzbekistan</p>
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
    
                    
                     
                    
                    {orderItems.map((order) => {
                      const {_id, title, images, amount, price} = order
                      return (
                        <tbody key={_id} className='order-content'>
                      <tr>
                        
                        <td className='order-btext lhtc oc-btn'>
                          <img className='od-img' alt={title} src={images[0].url} /> {title}</td>
                        <td className='order-atext lhtc'>{amount}</td>
                        <td className='order-atext'>₦{price.toLocaleString()}</td>
                        <td className='order-atext'>₦{price * amount}</td>
                      </tr>
                      </tbody>
                      )
                    })} 
                    
                    
                </table>
                  
                <div className='total-content'>
                  <div className='bloc'>
                    <h3 className='tc-text'><span className='tc-title'>Subtotal:</span>₦ {subtotal.toLocaleString()}</h3>
                    <h3 className='tc-text'><span className='tc-title'>Shipping cost:</span>₦ {shippingFee.toLocaleString()}</h3>
                    <h3 className='tc-text'><span className='tc-title'>Total:</span>₦ {total.toLocaleString()}</h3></div>
                </div>
              </div>
    
              <div className='pinfo-content'>
                    <div>
                        <h3 className='p-info'>Payment info</h3>
                        <p className='pinfo-text'><span  className='pinfot'>Business name</span>: Master Card, inc</p>
                        <p className='pinfo-text'><span className='pinfot'>Phone</span>: +234 1800 000</p>
                    </div>
                    
              </div>
            </div>
    
            </div>
          </section>
        </div>
      )
    }
    
  }
  


export default OrderDetails