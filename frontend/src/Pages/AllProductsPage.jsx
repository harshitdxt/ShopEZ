import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import {useAuth}  from '../Context/AuthContext'
import ProductFilterComp from '../components/ProductFilterComp' // ✅ import filter component

function AllProductsPage() {
  const [allproduct,setAllProducts]=useState([])

  const [filters, setFilters] = useState({
  keyword: '',
  category: '',
  gender: '',
  minPrice: '',
  maxPrice: '',
})
const { user } = useAuth();


  
   const navigate=useNavigate()

   const RedirectToSingleProduct=(id)=>{
         navigate(`/product/${id}`)
   }

    // ✅ Function to handle add to cart
  const handleAddToCart = async (product) => {
    // Check if current user is the creator of product
  const isCreator = user?._id === product?.createdByUser;

  if (isCreator) {
      alert("You cannot Add To Cart of  your own product.");
      return;
    }
    try {
      const payload = {
        productId: product._id,
        quantity: 1, // Default quantity; you can customize
        sizes: product.sizes?.[0] || 'default', // Adjust based on product
      }

      const response = await axios.post('http://localhost:5000/api/v1/addcart', payload, {
        withCredentials: true,
      })

      console.log('Added to cart:', response.data)
      alert('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add product to cart.')
    }
  }

  // ✅ Fetch products with filters
  const getFilteredProducts = async () => {
    try {
      const queryParams = new URLSearchParams()

      if (filters.keyword) queryParams.append('keyword', filters.keyword)
      if (filters.category) queryParams.append('category', filters.category)
      if (filters.gender) queryParams.append('gender', filters.gender)
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice)
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice)

      const url = `http://localhost:5000/api/v1/filter-product?${queryParams.toString()}`

      const result = await axios.get(url, {
        withCredentials: true,
      })

      console.log('Filtered products:', result.data.product)
      setAllProducts(result.data.product)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

   useEffect(() => {
    getFilteredProducts()
  }, [filters]) // ✅ Re-fetch on any filter change

  const getAllProducts=async()=>{
    try {
      const result=await axios.get('http://localhost:5000/api/v1/product',{
      withCredentials: true, // ✅ Include cookies
    })
      console.log('The All Product is fetched',result.data)
      setAllProducts(result.data.products)
    } catch (error) {
      console.log('Error in getting all the productrs')
    }
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Explore All Products</h2>

        <ProductFilterComp filters={filters} onChange={setFilters} />

        {allproduct.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            Loading products or no matches found...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {allproduct.map((product) => (
              <Card
                key={product._id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onViewDetails={() => RedirectToSingleProduct(product._id)}
                mode="product"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProductsPage