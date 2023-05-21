import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import React from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import ResetPassword from './auth/ResetPassword';
import PasswordReset from './auth/PasswordReset';
import Dashboard from './dashboard/Dashboard';
import EditAccount from './dashboard/EditAccount';
import EditShipping from './dashboard/EditShipping';
import EditBilling from './dashboard/EditBilling';
import Address from './dashboard/Address';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderComplete from './pages/OrderComplete';
import OrderPay from './pages/OrderPay';
import VerifyOrder from './pages/VerifyOrder';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blog-detail" element={<BlogDetail />} />
        <Route exact path="/forgot-password" element={<ResetPassword />} />
        <Route exact path="/reset-password/:email/:token" element={<PasswordReset />} />
        <Route exact path="/product-detail/:id" element={<ProductDetail />} />
        <Route exact path="/cart" element={<Cart />} />
      
        <Route exact path="/order-complete" element={<OrderComplete />} />
        <Route exact path="/order-pay" element={<OrderPay />} />
        <Route exact path="/order/verify" element={<VerifyOrder />} />
        <Route exact path="/checkout" element={<Checkout />} />

        <Route element={<ProtectedRoute />}>
          <Route exact path="/myaccount" element={<Dashboard />} />
          <Route exact path="/edit-account" element={<EditAccount />} />
          <Route exact path="/address" element={<Address />} />
          <Route exact path="/address/shipping" element={<EditShipping />} />
          <Route exact path="/address/billing" element={<EditBilling />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
{/* <Route path="users">
<Route path="/:userId" element={<Login />} />
</Route> */}
export default App;
