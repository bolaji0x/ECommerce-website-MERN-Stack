import React from 'react'
import { AdminProductContainer } from '../../components'
import PageBtnContainer from '../../components/PageBtnContainer'
import { useAppContext } from '../../context/appContext'
const AdminProducts = () => {
  const { numOfPages } = useAppContext()
  return (
    <>
      <section className='list-container'>
        <h1 className='page-title'>Products list</h1>
        <div className='list-content'>
          <div className='pl-head ca'>
            <input
              type='Search'
              placeholder='Search'
              className='pl-input'
            />
            <div className='plhead-right'>
              <button className='sort-btn'>Last added</button>
            </div>
          </div>

          <AdminProductContainer />

          
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
      </section>
      
    </>
  )
}

export default AdminProducts