import React from 'react'
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 text-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                ShopEZ
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Your one-stop destination for premium products at unbeatable prices.
              Shop smart, shop easy with ShopEZ.
            </p>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Home & Garden</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Sports</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 ShopEZ. All rights reserved. Built with ❤️ for amazing shopping experiences.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer