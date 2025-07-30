import React from 'react'

function ProductFilterComp({ filters, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔎 Filter Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Search title or description"
          value={filters.keyword}
          onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          <option value="tshirt">T-Shirt</option>
          <option value="dress">Dress</option>
          <option value="shirt">Shirt</option>
          <option value="jeans">Jeans</option>
        </select>

        <select
          value={filters.gender}
          onChange={(e) => onChange({ ...filters, gender: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All Genders</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </div>
  )
}

export default ProductFilterComp