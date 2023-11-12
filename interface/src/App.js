import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Index from './components/Home';
import AdminDashboard from './components/admin/dashboard';
import Products from './components/admin/product';

import Login from './components/login';
import Register from './components/Register';
import CusDashboard from './components/Customer_dash';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
