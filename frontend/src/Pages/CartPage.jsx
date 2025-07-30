import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })
  const [placingOrder, setPlacingOrder] = useState(false)

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/mycart', {
        withCredentials: true,
      })
      setCartItems(response.data.cartItems)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/deletecart/${id}`, {
        withCredentials: true,
      })
      setCartItems((prev) => prev.filter((item) => item._id !== id))
    } catch (error) {
      console.error('Error deleting cart item:', error)
    }
  }

  const handleClearCart = async () => {
    try {
      await axios.delete('http://localhost:5000/api/v1/deleteallcart', {
        withCredentials: true,
      })
      setCartItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  const handlePlaceOrder = async () => {
    if (!address.fullName || !address.phone || !address.street) {
      alert('Please fill in all required address fields.')
      return
    }

    try {
      setPlacingOrder(true)
      await axios.post('http://localhost:5000/api/v1/createorder', address, {
        withCredentials: true,
      })
      alert('Order placed successfully!')
      setCartItems([])
      setAddress({
        fullName: '', phone: '', street: '',
        city: '', state: '', zipCode: '', country: ''
      })
    } catch (error) {
      console.error('Order error:', error)
      alert('Failed to place order.')
    } finally {
      setPlacingOrder(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛍 My Shopping Cart</h2>

        {loading ? (
          <p className="text-gray-500">Loading your cart...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is currently empty.</p>
        ) : (
          <>
            <button
              onClick={handleClearCart}
              className="mb-6 px-5 py-2 bg-red-500 text-black rounded hover:bg-red-600"
            >
              🗑 Clear Cart
            </button>

            <div className="space-y-6 mb-10">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border rounded-lg shadow-md p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.mainImage || 'https://via.placeholder.com/120'}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="mt-2 text-sm text-gray-700">
                      <span className="mr-4">Price: ₹{item.price}</span>
                      <span className="mr-4">Qty: {item.quantity}</span>
                      <span>Size: {item.sizes}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="bg-red-600 text-black px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">📦 Shipping Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="border p-2 rounded" />
                <input type="text" placeholder="Phone" value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="border p-2 rounded" />
                <input type="text" placeholder="Street Address" value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="border p-2 rounded" />
                <input type="text" placeholder="City" value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="border p-2 rounded" />
                <input type="text" placeholder="State" value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="border p-2 rounded" />
                <input type="text" placeholder="Zip Code" value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  className="border p-2 rounded" />
                <input type="text" placeholder="Country" value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="border p-2 rounded" />
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-black font-medium rounded hover:bg-green-700"
            >
              {placingOrder ? 'Placing Order...' : '🚚 Place Order'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default CartPage
