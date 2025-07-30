const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  title: String,
  price: Number,
  discount: Number,
  quantity: Number,
  sizes: [String] // ✅ Change from String to [String]
});

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  phone: String
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [orderItemSchema],
  totalAmount: Number,
  address: addressSchema, // ✅ Change from String to Object
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],
    default: 'processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
