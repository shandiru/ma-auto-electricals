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

const App = () => {
  const url = "http://localhost:4000";

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar className="w-64" />

        {/* Main content */}
        <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-auto">
          <Routes>
            <Route path="/list/product" element={<ProductList url={url} />} />
            <Route path="/list/car" element={<CarList url={url} />} />
            <Route path="/add/car" element={<AddCar url={url} />} />
            <Route path="/add/product" element={<AddProduct url={url} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
