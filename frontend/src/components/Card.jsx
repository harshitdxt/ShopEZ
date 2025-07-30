import React from 'react'

function Card({
  product,
  onAddToCart,
  onRemoveFromCart,
  onViewDetails,
  mode = 'product',
  quantity = 1,
}) {
  const totalPrice = product.price * quantity

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow p-4">
      <img
        className="w-full h-48 object-cover rounded-md border border-gray-200"
        src={product.mainImage || 'https://via.placeholder.com/300'}
        alt={product.title}
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-xs text-gray-500">Category: {product.category}</p>

        {mode === 'cart' || mode === 'order' ? (
          <>
            <p className="text-gray-700 text-sm">Qty: {quantity}</p>
            <p className="text-md font-bold text-green-600">Total: ₹{totalPrice.toFixed(2)}</p>
          </>
        ) : (
          <p className="text-green-600 font-bold text-md">₹{product.price?.toFixed(2)}</p>
        )}

        {product.description && mode !== 'cart' && mode !== 'order' && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          {mode === 'product' && (
            <>
              <button
                onClick={() => onAddToCart(product)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md hover:from-green-600 hover:to-green-700 transition font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={() => onViewDetails(product)}
                className="bg-blue-600 text-black py-2 rounded-md hover:bg-blue-700 transition font-medium"
              >
                View Details
              </button>
            </>
          )}

          {mode === 'cart' && (
            <button
              onClick={() => onRemoveFromCart(product)}
              className="col-span-2 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
