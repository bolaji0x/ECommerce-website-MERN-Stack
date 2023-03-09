import React from 'react'
import { BiSearchAlt2, BiChevronDown, BiSun, BiBell } from "react-icons/bi";
import { AiOutlineMenu  } from "react-icons/ai";
import { useAppContext } from '../context/appContext';
const AdminNavbar = () => {
  const { toggleSidebar} = useAppContext()
  return (
    <>
      <nav className='navbar-section'>
      <div className='ls-navbar'>
        <button type='button' onClick={toggleSidebar} ><AiOutlineMenu className='toggle-btn' /></button>
        <button type='button'><BiSearchAlt2 className='nv-btn' /></button>
        <input 
          type='search' 
          placeholder='Search'
          className='nav-input' 
        />
      </div>

      <div className='rs-navbar'>
        <button><BiSun className='nav-btn' /></button>
        <button><BiBell className='nav-btn' /></button>
        
        <button>< BiChevronDown className='nav-btn' /></button>
      </div>
      
      </nav>
    </>
    
  )
}

export default AdminNavbar