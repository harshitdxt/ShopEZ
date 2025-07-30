const express=require('express')
const router=express.Router()

// importing all the controller for routing purpose
const { RoleBaseVerify } = require("../middleware/RoleBased.js");

// importing the Controllers 
const {createOrder,getMyOrders,updateOrderStatus,getSellerOrders} =require('../controller/OrderController.js')

router.post('/createorder',createOrder)
router.get('/my-order',getMyOrders)
router.patch("/update-order/:id", RoleBaseVerify(["admin", "seller"]),updateOrderStatus );
router.get('/seller/orders',RoleBaseVerify(['seller']),getSellerOrders)



module.exports = router;