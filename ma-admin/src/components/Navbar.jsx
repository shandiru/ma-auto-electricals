import React, { useState } from "react";
import { assets } from "../assets/assets";
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
        <div className="flex items-center gap-2 md:gap-4">
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 md:gap-3 p-1 md:pl-3 md:pr-2 md:py-1 
                       hover:bg-slate-100 rounded-full transition-colors"
            >
              <span className="hidden md:block text-sm font-medium text-slate-700">
                Admin User
              </span>
              <div className="relative">
                <img 
                  className="w-10 h-10 object-cover rounded-full ring-2 ring-slate-200 
                           hover:ring-blue-500 transition-all" 
                  src={assets.profile_image} 
                  alt="Profile" 
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full 
                              ring-2 ring-white"></div>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl 
                            border border-slate-200 overflow-hidden z-50">
                <div className="px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600">
                  <p className="text-white font-semibold">Admin User</p>
                  <p className="text-blue-100 text-xs">admin@example.com</p>
                </div>
                
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 
                                   hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <User size={16} />
                    View Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 
                                   hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <Settings size={16} />
                    Settings
                  </button>
                </div>

                <div className="border-t border-slate-200 py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 
                                   hover:bg-red-50 flex items-center gap-3 transition-colors">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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