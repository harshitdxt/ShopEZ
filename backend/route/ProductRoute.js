const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer');

// importing all the controller for routing purpose
const { RoleBaseVerify } = require("../middleware/RoleBased.js");

const {
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
} = require("../controller/ProductController.js");
const { verifyToken } = require("../middleware/AuthOfToken.js");

// Routing of all routes
//router.post("/product", RoleBaseVerify(["admin", "seller"]), createProduct);
// ✅ UPDATED ROUTE: handle image upload and role verification
router.post(
  "/product",
  RoleBaseVerify(["admin", "seller"]),
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'carousel', maxCount: 5 },
  ]),
  createProduct
);
router.get("/product", getAllProduct);
router.get("/product/:id", getProductById);
router.put("/product/:id", verifyToken,updateProductById);
router.delete("/product/:id",verifyToken, deleteProductById);
router.get("/product/print", printprodcut);
router.get("/my-product", verifyToken,getMyProducts);
router.get("/filter-product", SearchAndFilterProduct);
router.post('/product/:id/review',verifyToken,addReviews)
router.patch('/product/:id/stock', verifyToken,UpdateStocks)

// router.get("/product", () => {
//   console.log("Product Routes ");
// });

module.exports = router;
