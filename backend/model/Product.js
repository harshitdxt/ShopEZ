const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    discount:{
        type:Number
    },
    price:{
        type:Number
    },
    gender:[{
        type:String
    }],
    category:[{
        type:String
    }],
    sizes:[{
        type:String
    }],
    createdByUser:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: true,
    },
    stockQuantity:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Types.ObjectId,
            ref:'User',
            required: true,
        },
        rating:{
            type:Number,
            min:1,
             max:5,
        },
        comment:{
            type:String,

        },
        createdAt: { type: Date, default: Date.now }

    }],
    isAvailable: { type: Boolean, default: true },
    

    // carrousel andimage will be later
    carousel:[{
        type:String
    }],
    mainImage:{
        type:String
    }

},
{
    timestamps:true
})

 module.exports=mongoose.model('Product',productSchema)