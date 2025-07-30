// server/route/PdfRoute.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/AuthOfToken");
const { generateOrderPdf } = require("../controller/PdfController");

router.get("/order/:orderId/pdf", verifyToken, generateOrderPdf);

module.exports = router;
