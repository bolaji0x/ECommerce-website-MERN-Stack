import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Register, Error, ProtectedRoute } from './pages'
import { SharedLayout, Home, AddProduct, AdminProducts, EditProduct, AllProducts, SingleProduct, AdminOrders } from './pages/dashboard'

import CartItem from './components/CartItem'

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
          
          <Route path='admin' element={<Home/>} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='all-products' element={<AdminProducts />} />
          <Route path='/:id/edit-product' element={<EditProduct />} />
          <Route path='/orders' element={<AdminOrders />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/all' element={<AllProducts/>} />
        <Route path='/product/:id' element={<SingleProduct/>} />

        <Route path='/cart' element={<CartItem />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
