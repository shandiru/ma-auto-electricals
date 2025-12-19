import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CarList from './pages/List/CarList';
import ProductList from './pages/List/ProductList';
import AddCar from './pages/Add/AddCar';
import AddProduct from './pages/Add/AddProduct';
import Login from './components/Login';
import Signup from './components/Signup';
import OrdersTable from './pages/Order';

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Sidebar & Navbar on login/auth page
  const hideLayout = location.pathname === '/';

  return (
    <div className="flex min-h-screen">
      {!hideLayout && <Sidebar className="w-64" />}
      <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-auto">
        {!hideLayout && <Navbar />}
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
        <Route path="/" element={<Login url={url} />} />
        <Route path="/signup" element={<Signup url={url} />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/list/product" element={<ProductList url={url} />} />
                <Route path="/list/car" element={<CarList url={url} />} />
                <Route path="/add/car" element={<AddCar url={url} />} />
                <Route path="/add/product" element={<AddProduct url={url} />} />
                <Route path="/list/order" element={<OrdersTable url={url} />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
