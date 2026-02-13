import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

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

  // If no token → go Signup (NOT login)
  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
};

/* ---------------- AUTH ROUTE BLOCK ---------------- */
/* Prevent logged-in users opening login/signup */
const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/list/product" replace />;
  }

  return children;
};

/* ---------------- LAYOUT ---------------- */
const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="w-64" />

      {/* Main Content */}
      <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-auto">
        <Navbar />

        {/* Child pages */}
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
        {/* -------- AUTH ROUTES -------- */}
        <Route
          path="/"
          element={
            <AuthRoute>
              <Login url={url} />
            </AuthRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup url={url} />
            </AuthRoute>
          }
        />

        {/* -------- PROTECTED -------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/list/product" element={<ProductList url={url} />} />
            <Route path="/list/car" element={<CarList url={url} />} />
            <Route path="/add/car" element={<AddCar url={url} />} />
            <Route path="/add/product" element={<AddProduct url={url} />} />
            <Route path="/list/order" element={<OrdersTable url={url} />} />
          </Route>
        </Route>

        {/* -------- FALLBACK -------- */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
