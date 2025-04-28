import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Dashboard from '../Pages/Dashboard';
import AllProducts from '../Pages/AllProducts';
import Categories from '../Pages/Categories';
import Cart from '../Pages/Cart';
import CategoryProducts from '../Pages/CategoryProducts';
import OrderPlaced from '../Pages/OrderPlaced';

function Approutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Approutes;