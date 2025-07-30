const mongoose=require('mongoose')
const Cart=require('../model/Cart')
const Product=require('../model/Product')

const addCart=async(req,res)=>{
    try {
        const {productId,quantity ,sizes}=req.body
        const userId=req.user._id
        const product=await Product.findById(productId)

        if(!product)
        {
            return res.status(404).json({msg:"Product is not found"})
        }
        const cartItem=await Cart.create({
            userId,
            productId,
            quantity,
            sizes,
            title:product.title,
            description:product.description,
            mainImg:product.mainImg,
            price:product.price,
            discount:product.discount
        })
        console.log('Add to cart successfully',cartItem)
        return res.status(201).json({ msg: "Added to cart", cartItem });

    } catch (error) {
         console.error("Add to cart error", err);
    return res.status(500).json({ msg: "Internal Server error" });
    }
}

const getMyCart=async(req,res)=>{
    try {
        const userId=req.user._id
        const cartItems=await Cart.find({userId})
        console.log('Getting all My carts',cartItems)
        return res.status(200).json({ total: cartItems.length, cartItems });
    } catch (error) {
         console.error("Get to cart error", err);
    return res.status(500).json({ msg: "Internal Server error" });
    }
}
const deleteCartItem=async(req,res)=>{
    try {
        const {id}=req.params
        const result =await Cart.findByIdAndDelete(id)
        console.log('Card item has been Deleted',result)
         return res.status(200).json({ msg: "Cart item Deleted" });
    } catch (error) {
        console.error("Error getting remove the cart error", error);
    return res.status(500).json({ msg: "Internal Server error" });
    }
}

const deleteAllMyCart=async(req,res)=>{
    try {
        const userId=req.user._id
      const result=await Cart.deleteMany({userId})  
      console.log('delete all my Cart at ',result)
       return res.status(200).json({ msg: "Cart cleared" });
    } catch (error) {
        console.log('Error to delete all cart',error)
         return res.status(500).json({ msg: "Failed to clear cart" });
    }
}
module.exports={addCart,getMyCart,deleteCartItem,deleteAllMyCart}