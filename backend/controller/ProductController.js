const mongoose = require("mongoose");
const Product = require("../model/Product");

// const createProduct = async (req, res) => {
//   const body = req.body;
//   if (!body || !body.title || !body.description) {
//     return res.status(400).json({ msg: "All Filed are required " });
//   }
//   try {
//     const userId = req.user._id;
//     const userType = req.user.userType;

//     // allowed only the admin and seller to create the products
//     if (userType === "customer") {
//       return res
//         .status(400)
//         .json({ msg: "You are not authorized to create the Product" });
//     }
//     const result = await Product.create({
//       title: body.title,
//       description: body.description,
//       price: body.price,
//       discount: body.discount,
//       gender: body.gender,
//       category: body.category,
//       sizes: body.sizes,
//       stockQuantity: body.stockQuantity,
// isAvailable: body.stockQuantity > 0, // optional but nice
//       createdByUser: userId, // this tell the which user has created this product
//     });
//     console.log("Product is created successfully", result);
//     return res
//       .status(201)
//       .json({ msg: "Product created successfully", product: result });
//   } catch (error) {
//     console.log("Error in Log in", error);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };


const createProduct = async (req, res) => {
  const body = req.body;

  if (!body || !body.title || !body.description) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const userId = req.user._id;
    const userType = req.user.userType;

    // Only allow admin or seller
    if (userType === "customer") {
      return res.status(403).json({ msg: "You are not authorized to create a product" });
    }

    // ✅ Extract image URLs from Cloudinary upload via multer
    const mainImage = req.files?.mainImage?.[0]?.path || '';
    const carouselImages = req.files?.carousel?.map(file => file.path) || [];

    // ✅ Create the product with images
    const result = await Product.create({
      title: body.title,
      description: body.description,
      price: body.price,
      discount: body.discount,
      // gender: body.gender,
      // category: body.category,
      // sizes: body.sizes,
      gender: JSON.parse(body.gender || '[]'),
category: JSON.parse(body.category || '[]'),
sizes: JSON.parse(body.sizes || '[]'),
      stockQuantity: body.stockQuantity,
      isAvailable: body.stockQuantity > 0,
      createdByUser: userId,
      mainImage,        // ✅ Add mainImage
      carousel: carouselImages, // ✅ Add carousel images
    });

    console.log("Product created successfully", result);
    return res.status(201).json({
      msg: "Product created successfully",
      product: result,
    });

  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


const getAllProduct = async (req, res) => {
  try {
    const result = await Product.find({});
    console.log("All Products ", result);
    return res
      .status(200)
      .json({
        msg: "All Prodcut Get Success",
        total: result.length,
        products: result,
      });
  } catch (error) {
    console.log("Error in getting all products", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "The Product Id is invalid" });
    }
    const result = await Product.findById(id).populate('reviews.user', 'name'); // 👈 only include name from user;
    if (!result) {
      return res
        .status(401)
        .json({ msg: "Product not found with the provided ID", product: null });
    }
    console.log("The Prodcut By Id", result);
    return res
      .status(200)
      .json({ msg: "Product is Get by Id", product: result });
  } catch (error) {
    console.log("Error in getting products by Id", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "The Product Id is invalid" });
    }
    const inputdata = req.body;
    const userId = req.user._id;
    const userType = req.user.userType;
    const findProductId = await Product.findById(id);
    if (!findProductId) {
      return res.status(404).json({ msg: "Product not found" });
    }
    if (!findProductId.createdByUser) {
      return res.status(404).json({ msg: "Product creator info is missing" });
    }
    if (
      findProductId.createdByUser.toString() !== userId.toString() ||
      userType !== "seller"
    ) {
      return res
        .status(403)
        .json({
          msg: "You can not update the Product because of role of you have not create it ",
        });
    }
    const result = await Product.findByIdAndUpdate(id, inputdata, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ msg: "the update data is not found" });
    }
    console.log("The data is update succesffully", result);

    return res
      .status(200)
      .json({ msg: "The data is update successfully by id", product: result });
  } catch (error) {
    console.log("Error in getting products by Id", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "The Product Id is invalid" });
    }
    const userId = req.user._id;
    const userType = req.user.userType;
    const findProductId = await Product.findById(id);
    if (!findProductId || !findProductId.createdByUser) {
      return res
        .status(404)
        .json({ msg: "Product not found or creator info missing" });
    }
    // Allow only the creator or admin to delete
    if (
      findProductId.createdByUser.toString() !== userId.toString() &&
      userType !== "seller"
    ) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to delete this product" });
    }

    const product = await Product.findByIdAndDelete(id);
    console.log("Product deleted successfully:", product);

    return res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in getting products by Id", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const id = req.user._id;
    const userType = req.user.userType;
    if (userType === "customer") {
      return res
        .status(403)
        .json({ msg: "Customer are not authorized view created" });
    }
    const products = await Product.find({ createdByUser: id });
    console.log("User Created Product", products);
    return res.status(200).json({
      msg: "Products fetched successfully",
      total: products.length,
      products,
    });
  } catch (error) {
    console.log("Error in getting products by Id", error);
    return res.status(500).json({ msg: "Internal Server Error " });
  }
};

const SearchAndFilterProduct = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice, category, gender } = req.query;
    const filter = {};
    if (keyword) {
      filter.$or = [
         { title: { $regex: new RegExp(keyword, 'i') } },
  { description: { $regex: new RegExp(keyword, 'i') } }
      ];
    }
    if (category) {
      filter.category = { $in: category.split(",") };
    }
    if (gender) {
      filter.gender = { $in: gender.split(",") };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    console.log('filter applied',filter)
    const product = await Product.find(filter);
    console.log("Filtered Products", product);
    return res
      .status(200)
      .json({
        msg: "Filtered products fetched successfully",
        total: product.length,
        product,
      });
  } catch (error) {
    console.log("Error in searching products", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const addReviews=async(req,res)=>{
  try {
    const id=req.params.id
    const {rating,comment}=req.body
    const userId=req.user._id
    const product=await Product.findById(id)
    if (!product) {
       return res.status(404).json({ msg: "Product not found" });
    }
     product.reviews.push({ user: userId, comment, rating });
    await product.save();

    console.log("Comment added to the product:", product.reviews);
    return res.status(200).json({ msg: "Review added", product });
  } catch (error) {
    console.log('Error in adding review',error)
    return res.status(500).json({ msg: "Error adding review" });
  }
}

const UpdateStocks=async(req,res)=>{
  try {
    const id=req.params.id
    const userType=req.user.userType
    const userId=req.user._id
    const {stockQuantity}=req.body
    if(!mongoose.Types.ObjectId.isValid(id))
    {
      return res.status(400).json({msg:'Invalid Product id'})
    }
    const product=await Product.findById(id)
    if(!product){
      return res.status(404).json({msg:'Product not found'})
    }
    // only seller and jine banaya kud ka hi update the product
    if(product.createdByUser.toString()!==userId.toString() && userType !== 'seller')
    {
      return res.status(403).json({msg:'Unauthroized to Update the stock'})
    }
    product.stockQuantity=stockQuantity
    product.isAvailable=stockQuantity>0
    await product.save()
    return res.status(200).json({msg:'Product Stock is updated',product})
  } catch (error) {
    console.log("Error updating stock:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
const printprodcut = async (req, res) => {
  console.log("Print Product");
};

module.exports = {
  printprodcut,
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getMyProducts,
  SearchAndFilterProduct,
  addReviews,
  UpdateStocks,
};
