import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { Plus, List, Car, Package, LogOut } from "lucide-react"; // ← added LogOut icon

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      to: "/add/product",
      icon: <Plus size={20} />,
      label: "Add Product",
      color: "blue"
    },
    {
      to: "/add/car",
      icon: <Car size={20} />,
      label: "Add Car",
      color: "purple"
    },
    {
      to: "/list/product",
      icon: <Package size={20} />,
      label: "List Products",
      color: "green"
    },
    {
      to: "/list/car",
      icon: <List size={20} />,
      label: "List Cars",
      color: "orange"
    }
  ];

  const colorClasses = {
    blue: {
      active: "bg-blue-50 border-blue-500 text-blue-700",
      hover: "hover:bg-blue-50/50 hover:border-blue-300",
      icon: "text-blue-600"
    },
    purple: {
      active: "bg-purple-50 border-purple-500 text-purple-700",
      hover: "hover:bg-purple-50/50 hover:border-purple-300",
      icon: "text-purple-600"
    },
    green: {
      active: "bg-green-50 border-green-500 text-green-700",
      hover: "hover:bg-green-50/50 hover:border-green-300",
      icon: "text-green-600"
    },
    orange: {
      active: "bg-orange-50 border-orange-500 text-orange-700",
      hover: "hover:bg-orange-50/50 hover:border-orange-300",
      icon: "text-orange-600"
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/"); // redirect to login page
  };

  return (
    <div className="flex flex-col justify-between w-54 min-h-screen bg-linear-to-b from-slate-50 to-white border-r border-slate-200 
                    max-md:w-20 transition-all duration-300">
      
      <div>
        {/* Logo/Header Section */}
        <div className="p-6 border-b border-slate-200 max-md:p-4">
          <div className="flex items-center gap-3 max-md:justify-center">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl 
                            flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="max-md:hidden">
              <h2 className="font-bold text-slate-800 text-lg">Admin Panel</h2>
              <p className="text-xs text-slate-500">Manage your store</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl 
                 border-2 transition-all duration-200
                 ${isActive 
                   ? `${colorClasses[item.color].active} shadow-md transform scale-[1.02]` 
                   : `border-transparent ${colorClasses[item.color].hover}`
                 }
                 max-md:justify-center max-md:px-3
                `
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`
                    transition-transform duration-200 
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                    ${isActive ? colorClasses[item.color].icon : 'text-slate-600'}
                  `}>
                    {item.icon}
                  </div>
                  <span className={`
                    font-medium text-sm max-md:hidden
                    ${isActive ? 'font-semibold' : 'text-slate-700'}
                  `}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-current max-md:hidden"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-200 max-md:p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-all duration-200 max-md:justify-center"
        >
          <LogOut size={20} />
          <span className="max-md:hidden">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
