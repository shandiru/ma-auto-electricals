import React, { useState } from "react";
import { Bell, Search, Settings, LogOut, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const notifications = [
    { id: 1, text: "New car added to inventory", time: "2m ago", unread: true },
    { id: 2, text: "Product stock running low", time: "1h ago", unread: true },
    { id: 3, text: "Order #1234 completed", time: "3h ago", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4">
        
        {/* Left Section - Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* <img 
            className="h-10 md:h-12 w-auto" 
            src={assets.logo} 
            alt="Logo" 
          /> */}
          
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-xs text-slate-500">Welcome back, Admin</p>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        
         
         
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;