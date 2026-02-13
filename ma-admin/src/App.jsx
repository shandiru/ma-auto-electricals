import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import CarList from "./pages/List/CarList";
import ProductList from "./pages/List/ProductList";
import AddCar from "./pages/Add/AddCar";
import AddProduct from "./pages/Add/AddProduct";
import OrdersTable from "./pages/Order";

import Login from "./components/Login";
import Signup from "./components/Signup";

/* ---------------- PROTECTED ROUTE ---------------- */
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

/* ---------------- LAYOUT (INLINE) ---------------- */
const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="w-64" />

      {/* Main Content */}
      <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-auto">
        <Navbar />

        {/* Child pages render here */}
        <Outlet />
      </div>
    </div>
  );
};

/* ---------------- APP ---------------- */
const App = () => {
  const url = "https://ma-auto-electricals.onrender.com";

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        {/* -------- PUBLIC ROUTES -------- */}
        <Route path="/" element={<Login url={url} />} />
        <Route path="/signup" element={<Signup url={url} />} />

        {/* -------- PROTECTED ROUTES -------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/list/product" element={<ProductList url={url} />} />
            <Route path="/list/car" element={<CarList url={url} />} />
            <Route path="/add/car" element={<AddCar url={url} />} />
            <Route path="/add/product" element={<AddProduct url={url} />} />
            <Route path="/list/order" element={<OrdersTable url={url} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
