import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-10">SellerZone 🛍️</h2>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/seller/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 font-semibold'
              : 'hover:text-blue-300'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/seller/products"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 font-semibold'
              : 'hover:text-blue-300'
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/seller/orders"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 font-semibold'
              : 'hover:text-blue-300'
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/seller/analytics"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 font-semibold'
              : 'hover:text-blue-300'
          }
        >
          Analytics
        </NavLink>
        <NavLink
          to="/seller/messages"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 font-semibold'
              : 'hover:text-blue-300'
          }
        >
          Messages
        </NavLink>
        <NavLink
          to="/seller/settings"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 font-semibold'
              : 'hover:text-blue-300'
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
