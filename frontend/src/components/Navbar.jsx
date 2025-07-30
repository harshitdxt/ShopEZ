import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { User, ShoppingCart } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/logout", {}, {
        withCredentials: true,
      });
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛒 ShopEZ
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          <li><Link to="/allproducts" className="hover:text-blue-500">Products</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 relative">
          <Link to="/cart" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
            <ShoppingCart className="w-5 h-5" />
            Cart
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
              <Link to="/signin" className="bg-gray-200 text-blue-600 px-4 py-2 rounded hover:bg-gray-300">SignUp</Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-800 hidden sm:inline">{user.email}</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    {user.userType === "customer" && (
                      <>
                        <li><Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link></li>
                        
                        <li><Link to="/user-profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
                        
                      </>
                    )}
                    {user.userType === "seller" && (
                      <>
                        <li><Link to="/myproducts" className="block px-4 py-2 hover:bg-gray-100">My Products</Link></li>
                        <li><Link to="/manage-products" className="block px-4 py-2 hover:bg-gray-100">Manage Products</Link></li>
                        <li><Link to="/user-profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
                        <li><Link to="/manage-orders" className="block px-4 py-2 hover:bg-gray-100">Manage Orders</Link></li>
                      </>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
