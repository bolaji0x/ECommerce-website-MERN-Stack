import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register, Error, ProtectedRoute } from './pages'
import { SharedLayout, Home, AddProduct, AllProducts } from './pages/dashboard'

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
          <Route path='all-products' element={<AllProducts />} />
        </Route>
        <Route path='/register' element={<Register />} />
        
        
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
