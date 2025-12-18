
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import TermsConditions from "./components/Term";
import Home from "./page/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import GDPRBanner from "../src/components/GDPRBanner"
import Navbar from "./components/Header";
import ContactPage from "./page/Contact";
import ProductPage from "./page/ProductPage";
import ProductDetails from "./components/Product/ProductDetails";
import CartPage from "./components/Product/CartPage";
import SuccessPage from "./components/Product/SuccessPage";
import Gumtree from "./page/Gumtree";
import MotPage from "../src/page/mot"
import ParkingPage from "./page/Parking";
import InstallationPage from "./page/Installation";
import HandfreePage from "./page/Handfree";
import DiagnosticsPage from "./page/Diagnostics";
import CarStereosPage from "./page/CarStereos";
import CarSecurityPage from "./page/CarSecurity";
import CarRepairPage from "./page/CarRepair";
import VehicleTrackingPage from "./page/VehicleTracking";
import Ford from "./page/Ford";
import Vauxhall from "./page/Vauxhall";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/gumtree" element={<Gumtree />} />
        <Route path="/mot" element={<MotPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/installation" element={<InstallationPage />} />
        <Route path="/handfree" element={<HandfreePage />} />
        <Route path="/diagnostics" element={<DiagnosticsPage />} />
        <Route path="/car-stereos" element={<CarStereosPage />} />
        <Route path="/car-security" element={<CarSecurityPage />} />
        <Route path="/car-repair" element={<CarRepairPage />} />
        <Route path="/vehicle-tracking" element={<VehicleTrackingPage />} />
        <Route path="/ford" element={<Ford />} />
        <Route path="/vauxhall" element={<Vauxhall />} />
      </Routes>
      <Footer />
      <GDPRBanner />
    </Router>
  );
}

export default App;
