const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["admin", "customer","seller"],
      default: "customer",
    },
    contactNumber: {
    type: String,
  },

  profileImage: {
    type: String, // Store image URL
  },
   sellerDetails: {
  website: { type: String },
  shopName: { type: String },
  gstNumber: { type: String },
  businessType: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  }
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
