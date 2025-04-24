import React from 'react'
import DashboardPage from '../Pages/DashboardPage'
import CartPage from '../Pages/CartPage'
import Categories from '../Pages/CategoriesPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductsPage from '../Pages/ProductsPage'


function Approutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  )
}

export default Approutes