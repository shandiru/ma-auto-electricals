import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import CarList from './pages/List/CarList';
import ProductList from './pages/List/ProductList';
import AddCar from './pages/Add/AddCar';
import AddProduct from './pages/Add/AddProduct';
import OrdersTable from './pages/Order';

import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64" />
      <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const url = "https://ma-auto-electricals.onrender.com";

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login url={url} />} />
        <Route path="/signup" element={<Signup url={url} />} />

        {/* Protected Routes */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/list/product" element={<ProductList url={url} />} />
                  <Route path="/list/car" element={<CarList url={url} />} />
                  <Route path="/add/car" element={<AddCar url={url} />} />
                  <Route path="/add/product" element={<AddProduct url={url} />} />
                  <Route path="/list/order" element={<OrdersTable url={url} />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
