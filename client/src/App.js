import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { OrderDetails } from './components'

import { Register, Error, ProtectedRoute } from './pages'
import { SharedLayout, Home, AddProduct, AdminProducts, EditProduct, AllProducts, SingleProduct, AdminOrders } from './pages/dashboard'


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
        <Route path='/signup' element={<Register />} />
        <Route path='/shop' element={<AllProducts/>} />
        <Route path='/product/:id' element={<SingleProduct/>} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
