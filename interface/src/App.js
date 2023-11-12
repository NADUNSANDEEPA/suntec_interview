import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Index from './components/customer/Home';
import AdminDashboard from './components/admin/dashboard';
import Products from './components/admin/product';

import Login from './components/customer/login';
import Register from './components/customer/Register';
import CusDashboard from './components/customer/Customer_dash';
import ViewProduct from './components/customer/View_product';
import CusCart from './components/customer/CusCart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}  exact/>         
        <Route path="/admin/dashboard" element={<AdminDashboard />}  />         
        <Route path="/admin/products" element={<Products />}  />   

        <Route path="/user/Register" element={<Register />}  />         
        <Route path="/user/Login" element={<Login />}  />         
        <Route path="/user/Dashboard" element={<CusDashboard />}  />         
        <Route path="/user/ViewProduct" element={<ViewProduct />}  />         
        <Route path="/user/Cart" element={<CusCart />}  />         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
