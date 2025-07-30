import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ManageProductPage() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [createproduct, setCreateProduct] = useState({
    title: '',
    description: '',
    discount: 0,
    price: 0,
    gender: [],
    category: [],
    sizes: [],
    createdByUser: '',
    stockQuantity: 0,
    reviews: [],
    isAvailable: true,
     mainImage: null,          // 👈 Added for main image
  carouselImages: [],       // 👈 Added for carousel images
  });

  const [genderInput, setGenderInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [sizesInput, setSizesInput] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`, {
          withCredentials: true,
        });
        const product = res.data.product;

        setCreateProduct({
          title: product.title || '',
          description: product.description || '',
          discount: product.discount || 0,
          price: product.price || 0,
          gender: product.gender || [],
          category: product.category || [],
          sizes: product.sizes || [],
          createdByUser: product.createdByUser || '',
          stockQuantity: product.stockQuantity || 0,
          reviews: product.reviews || [],
          isAvailable: product.isAvailable ?? true,
        });
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    if (isEditMode) fetchProduct();
  }, [id, isEditMode]);

  const handleTagKeyPress = (e, input, setInput, key) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = input.trim();
      if (value && !createproduct[key].includes(value)) {
        setCreateProduct((prev) => ({
          ...prev,
          [key]: [...prev[key], value],
        }));
      }
      setInput('');
    }
  };

  const removeTag = (key, tag) => {
    setCreateProduct((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== tag),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === 'number'
        ? Number(value)
        : type === 'checkbox'
        ? checked
        : value;

    setCreateProduct((prev) => ({ ...prev, [name]: newValue }));
  };

  // old
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const endpoint = isEditMode
  //     ? `http://localhost:5000/api/v1/product/${id}`
  //     : 'http://localhost:5000/api/v1/product';

  //   const method = isEditMode ? 'put' : 'post';

  //   try {
  //     const result = await axios[method](endpoint, createproduct, {
  //       withCredentials: true,
  //     });

  //     alert(isEditMode ? 'Product updated!' : 'Product created!');
  //     navigate('/seller'); // go back or to dashboard

  //   } catch (error) {
  //     console.log('Error submitting product:', error);
  //   }
  // };

  // new with image
  const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint = isEditMode
    ? `http://localhost:5000/api/v1/product/${id}`
    : 'http://localhost:5000/api/v1/product';

  const method = isEditMode ? 'put' : 'post';

  try {
    const formData = new FormData();

    // Append all fields except reviews (assume server adds reviews separately)
    for (let key in createproduct) {
      if (key === 'mainImage' && createproduct.mainImage) {
        formData.append('mainImage', createproduct.mainImage);
      } else if (key === 'carouselImages') {
        createproduct.carouselImages.forEach((file, index) => {
          formData.append('carousel', file);
        });
      } else if (Array.isArray(createproduct[key])) {
        formData.append(key, JSON.stringify(createproduct[key]));
      } else {
        formData.append(key, createproduct[key]);
      }
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    const result = await axios[method](endpoint, formData, config);

    alert(isEditMode ? 'Product updated!' : 'Product created!');
    navigate('/seller');
  } catch (error) {
    console.error('Error submitting product:', error.response || error);
    alert('Failed to submit product. Check console for details.');
  }
};

   return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isEditMode ? 'Update Product' : 'Create New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-1">Main Image</label>
            <input type="file" accept="image/*" onChange={(e) => setCreateProduct((prev) => ({ ...prev, mainImage: e.target.files[0] }))} required={!isEditMode} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Carousel Images</label>
            <input type="file" accept="image/*" multiple onChange={(e) => setCreateProduct((prev) => ({ ...prev, carouselImages: Array.from(e.target.files) }))} />
          </div>

          <InputText label="Title" name="title" value={createproduct.title} onChange={handleChange} required={!isEditMode} disabled={isEditMode} />

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" rows={3} className="w-full border rounded-md p-2" value={createproduct.description} onChange={handleChange} required={!isEditMode} disabled={isEditMode} />
          </div>

          {!isEditMode && (
            <>
              <TagInput label="Gender" inputValue={genderInput} setInputValue={setGenderInput} values={createproduct.gender} tagKey="gender" onAdd={handleTagKeyPress} onRemove={removeTag} />
              <TagInput label="Category" inputValue={categoryInput} setInputValue={setCategoryInput} values={createproduct.category} tagKey="category" onAdd={handleTagKeyPress} onRemove={removeTag} />
              <TagInput label="Sizes" inputValue={sizesInput} setInputValue={setSizesInput} values={createproduct.sizes} tagKey="sizes" onAdd={handleTagKeyPress} onRemove={removeTag} />
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Price" name="price" value={createproduct.price} handleChange={handleChange} />
            <InputField label="Discount (%)" name="discount" value={createproduct.discount} handleChange={handleChange} max={100} />
          </div>

          <InputField label="Stock Quantity" name="stockQuantity" value={createproduct.stockQuantity} handleChange={handleChange} />

          <div className="flex items-center">
            <input type="checkbox" name="isAvailable" checked={createproduct.isAvailable} onChange={handleChange} className="mr-2" />
            <label className="text-sm">Available for Sale</label>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            {isEditMode ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable Input Components
const InputField = ({ label, name, value, handleChange, max }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded"
      min={0}
      max={max}
      placeholder={label}
    />
  </div>
);

const InputText = ({ label, name, value, onChange, required, disabled }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded"
      placeholder={label}
      required={required}
      disabled={disabled}
    />
  </div>
);

const TagInput = ({ label, inputValue, setInputValue, values, tagKey, onAdd, onRemove, colorClass }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => onAdd(e, inputValue, setInputValue, tagKey)}
      className="w-full border px-3 py-2 rounded"
      placeholder="Type and press Enter"
    />
    <div className="flex flex-wrap gap-2 mt-2">
      {values.map((tag, idx) => (
        <span
          key={idx}
          className={`bg-${colorClass}-200 text-${colorClass}-800 px-2 py-1 rounded-full text-sm cursor-pointer`}
          onClick={() => onRemove(tagKey, tag)}
        >
          {tag} ✖
        </span>
      ))}
    </div>
  </div>
);

export default ManageProductPage;
