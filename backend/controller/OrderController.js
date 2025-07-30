const mongoose=require('mongoose')
const Cart=require('../model/Cart')
const Product=require('../model/Product')
const User=require('../model/User')
const Order = require('../model/Order')

const createOrder=async(req,res)=>{
    try {
        const userId=req.user._id
        const address=req.body
        if(!address)
        {
            return res.status(400).json({msg:'Address is required'})
        }
        const cartItem=await Cart.find({userId})
        if(!cartItem.length)
        {
            return res.status(400).json({msg:'Your cart is empty'})
        }
        let totalAmount=0
        const orderItems=[]
        for(const item of cartItem)
        {
            const product=await Product.findById(item.productId)
            if(!product && product.stockQuantity < item.quantity)
            {
                return res.status(400).json({ msg: `Product ${item.title} is out of stock or not enough quantity` });
            }
            // calculate totoal
            const priceAfterDiscount=item.price-(item.price*item.discount/100)
            totalAmount=priceAfterDiscount*item.quantity

            // push the order List
            orderItems.push({
                productId:item.productId,
                title:item.title,
                price:item.price,
                discount:item.discount,
                quantity: item.quantity,
        sizes: item.sizes
            })

            // update the stock
            product.stockQuantity-=item.quantity
            product.isAvailable=product.stockQuantity>0

            await product.save()
        }

        // create the order
        const order=await Order.create({
            userId,
            items:orderItems,
            totalAmount,
            address,
            paymentStatus: 'pending', // default
      orderStatus: 'processing'
        })
        console.log('Order has been created successfully',order)
        // clear the cart
        await Cart.deleteMany({userId})

        return res.status(201).json({ msg: "Order placed successfully", order });
    } catch (error) {
         console.error("Error placing order:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
    }
}


const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId });
    console.log("Fetched user's orders", orders);
    return res.status(200).json({
      msg: "Orders fetched successfully",
      total: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// const updateOrderStatus = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const { orderStatus, paymentStatus } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ msg: "Order not found" });
//     }

//     if (orderStatus) order.orderStatus = orderStatus;
//     if (paymentStatus) order.paymentStatus = paymentStatus;

//     await order.save();
//     return res.status(200).json({ msg: "Order updated", order });
//   } catch (error) {
//     console.error("Error updating order:", error);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };


const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderStatus, paymentStatus } = req.body;
    const user = req.user; // current logged-in user

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // If user is a seller, verify ownership of at least one product in the order
    if (user.role === 'seller') {
      // Find products created by this seller
      const sellerProducts = await Product.find({ createdBy: user._id }).select('_id');
      const sellerProductIds = sellerProducts.map(p => p._id.toString());

      // Check if order contains seller's product
      const ownsProduct = order.items.some(item => 
        sellerProductIds.includes(item.productId.toString())
      );

      if (!ownsProduct) {
        return res.status(403).json({ msg: "You are not authorized to update this order" });
      }
    }

    // You can optionally allow admins to update all orders without restriction
    // if (user.role === 'admin') { /* allow */ }

    // Update statuses if provided
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    return res.status(200).json({ msg: "Order updated", order });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Use correct field 'createdByUser' here!
    const products = await Product.find({ createdByUser: sellerId }).select('_id');
    if (products.length === 0) {
      return res.status(200).json({ orders: [], msg: "No products found for this seller" });
    }

    const productIds = products.map(p => p._id);

    const orders = await Order.find({ 'items.productId': { $in: productIds } }).populate('userId', 'name email');

    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Failed to fetch seller orders' });
  }
};



module.exports={createOrder,getMyOrders,updateOrderStatus,getSellerOrders}