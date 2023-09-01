const mongoose = require('mongoose');
const { Schema } = mongoose;

// image,title,description,category,size-boolean,totleRatting,star,mrp,price

const productSchema = new Schema({
    image:{
        type:[String],
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:[String],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    size:{
        type:String,
    },
    model:{
        type:Boolean,
    },
    quantity:{
        type:Number,
        default : 1
    },
    totleRatting:{
        type:Number,
        required:true
    },
    star:{
        type:Number,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
      }
});

module.exports = mongoose.model('product',productSchema);