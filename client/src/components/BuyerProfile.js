import React from 'react'
import { useAppContext } from '../context/appContext'

const BuyerProfile = () => {
    const { buyer } = useAppContext()

    if(!buyer) {
        return <h1>Buyer not logged in</h1>
    }
  return (
    <div>
        BuyerProfile
        <h1>{buyer.username}</h1>
    </div>
  )
}

export default BuyerProfile