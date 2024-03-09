const mongoose = require("mongoose")
const {Schema , model} = mongoose
//Schema
const CartSchema = new Schema({
    product_id: {type: Schema.Types.ObjectId, ref: "Product"},
    email:{type:String , require: true},
    price:{type:Number , require: true},
    name:{type:String , require: true},
    image:{type:String , require: true},
    quantity:{type:Number , require: true},
},
    {
    timestamps:true,
    }
)
const ProductModel = model("Cart", CartSchema)
module.exports = ProductModel