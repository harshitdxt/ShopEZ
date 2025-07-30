import React from 'react'

function ContactUsPage() {
  return (
      <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-800">📍 Address:</h4>
              <p>123 ShopVerse Street, Mumbai, India</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">📞 Phone:</h4>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">📧 Email:</h4>
              <p>support@shopverse.com</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ContactUsPage