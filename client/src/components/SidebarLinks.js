import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {BiChevronDown } from "react-icons/bi";
const SidebarLinks = ({page, icon, slinks}) => {
  const [showItems, setShowItems] = useState(false)
    return (
      <div className='each-sidebar'>
        <div className='eachs-grid'>
          <div>
            <button className='sidebar-btn'>{icon}</button>
            <label className='eachs-name'>{page}</label>
            <button onClick={() => setShowItems(!showItems)}>
              <BiChevronDown className='inv-btn sidebar-btn' />
            </button>
          </div>
          {showItems && 
          <div className='sidebar-sublinks'>{slinks.map((slink) => {
            const {id, label, url} = slink
            return <Link key={id} to={`/${url}`} className='each-sublink'>{label}</Link>
          })}
          </div>
          }
        </div>
      </div>
        
    );
}

export default SidebarLinks


