const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{ 
        type:Number,
        required:true
    },
    discription:String,
    thumbnail:String,
    images:Object,
    status:{
        type:Boolean,
        default:true
    }
}) 

const product = mongoose.model('products', productSchema);

module.exports = product;