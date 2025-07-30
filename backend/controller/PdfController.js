// server/controller/PdfController.js
const PDFDocument = require("pdfkit");
const Order = require("../model/Order");

const generateOrderPdf = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.orderId;
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) return res.status(404).send("Order not found");

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=order-${orderId}.pdf`);
    doc.pipe(res);

    // Branding Header
    doc.fillColor("#4F46E5").fontSize(24).text("🛍 ShopEZ", { align: "center" });
    doc.moveDown().moveDown();

    // Receipt Title
    doc.fillColor("black").fontSize(20).text(`Order Receipt`, { align: "center" });
    doc.moveDown();

    // Order Summary
    doc.fontSize(12).fillColor("#444").text(`Order ID: ${order._id}`);
    doc.text(`Placed on: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`Order Status: ${order.orderStatus}`);
    doc.text(`Payment Status: ${order.paymentStatus}`);
    doc.text(`Total Amount: ₹${order.totalAmount.toFixed(2)}`);
    doc.moveDown();

    // Shipping Address
    const a = order.address;
    doc.fontSize(14).fillColor("#222").text("Shipping Address:", { underline: true });
    doc.fontSize(12).fillColor("#444").text(
      `${a.fullName}, ${a.street}, ${a.city}, ${a.state} - ${a.zip}, ${a.country}`
    );
    doc.text(`Phone: ${a.phone}`);
    doc.moveDown();

    // Divider
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#ccc").stroke();
    doc.moveDown();

    // Items Table
    doc.fontSize(14).fillColor("#222").text("Items Ordered:", { underline: true });
    doc.moveDown(0.5);

    order.items.forEach((item, i) => {
      doc.fontSize(12).fillColor("#444").text(
        `• ${item.title} | Qty: ${item.quantity} | Size(s): ${
          Array.isArray(item.sizes) ? item.sizes.join(", ") : item.sizes
        }`
      );
    });

    // Footer
    doc.moveDown();
    doc.fontSize(12).fillColor("#888").text("Thank you for shopping with ShopEZ!", {
      align: "center",
    });

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).send("Internal Server Error");
  }
};



module.exports = { generateOrderPdf };