import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import CustomerRegister from './components/CustomerRegister';
import CustomerLogin from './components/CustomerLogin';
import GroceryOwnerRegister from './components/GroceryOwnerRegister';
import GroceryOwnerLogin from './components/GroceryOwnerLogin'
import TiffinServiceOwnerRegister from './components/TiffinServiceOwnerRegister';
import TiffinServiceOwnerLogin from './components/TiffinServiceOwnerLogin';
import CustomerDashboardBuyProducts from './components/CustomerDashboardBuyProducts';
import CustomerDashboardGetTiffinService from './components/CustomerDashboardGetTiffinService';
import GroceryOwnerDashboard from './components/GroceryOwnerDashboard';
import TiffinServiceOwnerDashboard from './components/TiffinServiceOwnerDashboard';
import Cart from './components/Cart';
import CartContextProvider from './context/CartContextProvider';
import LoginContextProvider from './context/LoginContextProvider';
import ServiceSelectionModal from './components/ServiceSelectionModal';
import Navbar from './components/Navbar';
import PaymentGateway from './components/PaymentGateway';
import './index.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <LoginContextProvider>
          <CartContextProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customer/register" element={<CustomerRegister />} />
              <Route path="/customer/login" element={<CustomerLogin />} />
              <Route path="/groceryowner/register" element={<GroceryOwnerRegister />} />
              <Route path="/groceryowner/login" element={<GroceryOwnerLogin />} />
              <Route path="/tiffinserviceowner/register" element={<TiffinServiceOwnerRegister />} />
              <Route path="/tiffinserviceowner/login" element={<TiffinServiceOwnerLogin />} />
              <Route path="/Customer/Dashboard/buyproducts" element={<CustomerDashboardBuyProducts />} />
              <Route path="/Customer/Dashboard/gettiffinservice" element={<CustomerDashboardGetTiffinService />} />
              <Route path="/GroceryOwner/Dashboard" element={<GroceryOwnerDashboard />} />
              <Route path="/TiffinServiceOwner/Dashboard" element={<TiffinServiceOwnerDashboard />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/payment" element={<PaymentGateway />} />
              <Route path='/serviceselectionmodal' element={<ServiceSelectionModal />} />
            </Routes>
          </CartContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
    </>

  );
};

export default App;
