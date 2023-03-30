import React from 'react'
import Logo from './Logo'
import { BiX } from "react-icons/bi";

import { useAppContext } from '../context/appContext';

import SidebarLinks from './SidebarLinks';
import links from './sublinks';

const Sidebar = () => {
  const { showSidebar,  toggleSidebar} = useAppContext()
  
  return (
    <>
      <aside className={
          !showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }>
        <div className='sidebar-head'>
          <div className='sidebar-img'><Logo /></div>
          <button onClick={toggleSidebar}><BiX className='close-btn' /></button>
        </div>
        
          
        <div className='sidebar-content'>  
              {links.map((link) => {
                return (
                  <SidebarLinks key={link.id} {...link}></SidebarLinks>
                );
              })}
        </div>
      </aside>
    </>
  )
}

export default Sidebar