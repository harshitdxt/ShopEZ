const express=require('express')
const router=express.Router()


// importing the Controllers 
const {addCart,getMyCart,deleteCartItem,deleteAllMyCart} =require('../controller/CartController.js')

// routes
router.post('/addcart',addCart)
router.get('/mycart',getMyCart)
router.delete('/deletecart/:id',deleteCartItem)
router.delete('/deleteallcart',deleteAllMyCart)



module.exports = router;