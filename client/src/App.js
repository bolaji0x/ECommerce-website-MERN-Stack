import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { OrderDetails } from './components'

import { Register, Error, ProtectedRoute, RegisterBuyer } from './pages'
import { SharedLayout, Home, AddProduct, AdminProducts, EditProduct, AllProducts, SingleProduct, AdminOrders, Buyer, Checkout } from './pages/dashboard'


function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path='/' 
          element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
          }
        >
          <Route index element={<Home/>} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='all-products' element={<AdminProducts />} />
          <Route path='/:id/edit-product' element={<EditProduct />} />
          <Route path='/orders' element={<AdminOrders />} />
          <Route path='/order/:id' element={<OrderDetails />} />
          
        </Route>
        <Route path='/signup/seller' element={<Register />} />
        <Route path='/signup/buyer' element={<RegisterBuyer />} />
        <Route path='/shop' element={<AllProducts/>} />
        <Route path='/buyer' element={<Buyer />} />
        <Route path='/product/:id' element={<SingleProduct/>} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
