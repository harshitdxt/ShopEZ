import axios from 'axios';
import React from 'react'

function AboutPage() {
//   axios.get("http://localhost:5000/test-cookie", {
//   withCredentials: true
// }).then(res => {
//   console.log(res.data); // should print "Cookie test set."
// }).catch(err => {
//   console.error("Error hitting /test-cookie:", err);
// });
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          Welcome to <span className="font-semibold text-green-600">ShopEZ</span> — your one-stop destination for trendy fashion, quality products, and seamless shopping experiences. We believe shopping should be simple, fun, and tailored to your style.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">🛍 Our Mission</h2>
            <p className="text-gray-600 text-sm">
              To deliver stylish and sustainable fashion at your fingertips — empowering every shopper to look good and feel great.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">🚚 Fast & Reliable Delivery</h2>
            <p className="text-gray-600 text-sm">
              From our warehouse to your wardrobe — we promise quick, reliable shipping and transparent service every step of the way.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">💬 Customer Support</h2>
            <p className="text-gray-600 text-sm">
              Need help? Our friendly support team is available 24/7 to make sure you always have a smooth shopping experience.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">🌍 Sustainability Promise</h2>
            <p className="text-gray-600 text-sm">
              We care about the planet. That’s why we partner with eco-conscious brands and reduce packaging waste whenever possible.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Journey</h3>
          <p className="text-gray-600 mb-6">
            Whether you're here to shop, explore, or learn — we're thrilled to have you with us.
          </p>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300">
            Explore Our Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage