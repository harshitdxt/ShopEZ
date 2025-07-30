import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyProductPage() {
     const [products, setProducts] = useState([]);
     const navigate = useNavigate();

  // 🛎️ Fetch seller's products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/my-product', {
        withCredentials: true,
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/product/${productId}`, {
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
     <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        My Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg col-span-full">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 truncate">
                {product.title}
              </h3>
              <p className="text-gray-600 flex-grow mb-4">{product.description}</p>
              <p className="text-indigo-700 font-bold text-xl mb-6">₹{product.price}</p>

              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/manage-products/${product._id}`)}
                  className="flex-grow bg-blue-600 hover:bg-blue-700 text-blue font-semibold py-3 rounded-md shadow-md transition-colors duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-grow bg-red-600 hover:bg-red-700 text-red font-semibold py-3 rounded-md shadow-md transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProductPage