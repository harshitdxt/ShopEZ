
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useAuth}  from '../Context/AuthContext'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function SingleProduct() {
    const { id } = useParams(); // 🚀 Grab product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

const [reviewData, setReviewData] = useState({
  rating: '',
  comment: '',
});

const [reviewErrors, setReviewErrors] = useState({});

const handleReviewChange = (e) => {
  const { name, value } = e.target;
  setReviewData((prev) => ({
    ...prev,
    [name]: name === 'rating' ? Number(value) : value,
  }));
  setReviewErrors((prev) => ({ ...prev, [name]: null }));
};

// Check if current user is the creator of product
  const isCreator = user?._id === product?.createdByUser;

  const validateReview = () => {
    const errors = {};
    if (!reviewData.rating) errors.rating = "Rating is required";
    if (!reviewData.comment.trim()) errors.comment = "Comment is required";
    setReviewErrors(errors);
    return Object.keys(errors).length === 0;
  };

const handleReviewSubmit = async (e) => {
  e.preventDefault();

  if (isCreator) {
      alert("You cannot review your own product.");
      return;
    }

    if (!validateReview()) return;

  const newReview = {
    ...reviewData,
    user: user?.name || "Anonymous",  // auto-insert logged-in user's name
    createdAt: new Date().toISOString(),
  };

  try {
    const result = await axios.post(
      `http://localhost:5000/api/v1/product/${id}/review`,
      newReview,
      { withCredentials: true }
    );
    setProduct((prev) => ({
      ...prev,
      reviews: [...prev.reviews, newReview],
    }));
    setReviewData({ rating: '', comment: '' });
  } catch (err) {
    console.error("Review error:", err);
  }
};


  useEffect(() => {
    const getProductById = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/api/v1/product/${id}`, {
          withCredentials: true,
        });
        setProduct(result.data.product);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching product:", error);
        setLoading(false);
      }
    };

    getProductById();
  }, [id]);

  if (loading) return <div className="p-6">Loading product...</div>;
  if (!product) return <div className="p-6">No product found.</div>;
    
  return (
     <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
    {/* Product Image */}
    {/* <div className="md:col-span-5 flex justify-center items-center bg-gray-50 rounded-lg p-6 shadow-inner">
      <img
        src={product.mainImage || "/placeholder-image.png"}
        alt={product.title}
        className="max-h-[450px] w-full object-contain rounded-md"
      />
    </div> */}

    {/* new with carousel */}
    <div className="md:col-span-5 flex justify-center items-center bg-gray-50 rounded-lg p-6 shadow-inner">
  {product.carousel && product.carousel.length > 0 ? (
    <Carousel
      showThumbs={false}
      infiniteLoop
      autoPlay
      className="w-full max-h-[450px]"
    >
      {product.carousel.map((img, idx) => (
        <div key={idx}>
          <img
            src={img}
            alt={`Product Image ${idx + 1}`}
            className="object-contain max-h-[450px] rounded-md"
          />
        </div>
      ))}
    </Carousel>
  ) : product.mainImage ? (
    <img
      src={product.mainImage}
      alt={product.title}
      className="max-h-[450px] w-full object-contain rounded-md"
    />
  ) : (
    <div className="text-gray-500 text-center">
      <p>No images available</p>
      <img
        src="/placeholder-image.png"
        alt="Placeholder"
        className="max-h-[250px] mx-auto mt-4"
      />
    </div>
  )}
</div>

    {/* Product Info */}
    <div className="md:col-span-7 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          {product.title}
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

        <div className="flex items-center space-x-4 mb-6">
          <span className="text-4xl font-extrabold text-gray-900">₹{product.price}</span>
          {product.discount > 0 && (
            <span className="inline-block bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full text-sm">
              {product.discount}% OFF
            </span>
          )}
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              product.isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.isAvailable ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Tags: Category, Gender, Sizes */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-8">
          <div>
            <strong className="block mb-1 text-gray-800">Category</strong>
            <div className="flex flex-wrap gap-2">
              {product.category.map((cat) => (
                <span
                  key={cat}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div>
            <strong className="block mb-1 text-gray-800">Gender</strong>
            <div className="flex flex-wrap gap-2">
              {product.gender.map((g) => (
                <span
                  key={g}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div>
            <strong className="block mb-1 text-gray-800">Sizes</strong>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-medium"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* You can add Buy/Add to Cart buttons here */}
    </div>
  </div>

  {/* Divider */}
  <hr className="my-12 border-gray-300" />

  {/* Reviews Section */}
  <div>
    <h2 className="text-3xl font-semibold mb-8 border-b pb-3">Customer Reviews</h2>

    {product.reviews?.length === 0 ? (
      <p className="text-gray-500 mb-10">No reviews yet. Be the first to review!</p>
    ) : (
      <div className="space-y-8 mb-12">
        {product.reviews.map((review, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-gray-800">
                {review.user?.name || "Anonymous"}
              </p>
              <p className="text-yellow-400 font-bold tracking-wide text-lg">
                {"⭐".repeat(review.rating)}{" "}
                <span className="text-gray-400 font-normal text-base">/ 5</span>
              </p>
            </div>
            <p className="italic text-gray-700 mb-2">"{review.comment}"</p>
            <p className="text-xs text-gray-400">
              Posted on {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    )}

    {/* Review Form */}
    <div className="max-w-lg bg-gray-50 p-8 rounded-lg shadow-md mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center">Leave a Review</h3>

      {isCreator && (
        <p className="text-red-600 font-semibold mb-6 text-center">
          You cannot review your own product.
        </p>
      )}

      <form onSubmit={handleReviewSubmit} noValidate>
        <div className="mb-6">
          <label
            htmlFor="rating"
            className="block mb-2 font-medium text-gray-700"
          >
            Rating <span className="text-red-600">*</span>
          </label>
          <select
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleReviewChange}
            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
              reviewErrors.rating ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isCreator}
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          {reviewErrors.rating && (
            <p className="text-red-600 text-sm mt-1">{reviewErrors.rating}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block mb-2 font-medium text-gray-700"
          >
            Comment <span className="text-red-600">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={reviewData.comment}
            onChange={handleReviewChange}
            rows={5}
            placeholder="Share your experience..."
            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none ${
              reviewErrors.comment ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isCreator}
          />
          {reviewErrors.comment && (
            <p className="text-red-600 text-sm mt-1">{reviewErrors.comment}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isCreator}
          className={`w-full bg-blue-600 text-black font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${
            isCreator ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit Review
        </button>
      </form>
    </div>
  </div>
</div>

  )
}

export default SingleProduct