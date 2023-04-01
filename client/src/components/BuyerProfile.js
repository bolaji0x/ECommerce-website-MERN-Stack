import React from 'react'
import { useAppContext } from '../context/appContext'

const BuyerProfile = () => {
    const { user } = useAppContext()

    if(!user) {
        return <h1>Buyer not logged in</h1>
    }
  return (
    <div>
        BuyerProfile
        <h1>{user.username}</h1>
    </div>
  )
}

export default BuyerProfile