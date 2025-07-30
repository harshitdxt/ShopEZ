const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    quantity:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
    },
    discount:{
        type:Number,
    },
    sizes:[{
        type:String
    }],
},{
    timestamps:true,
})

module.exports=mongoose.model('Cart',cartSchema)