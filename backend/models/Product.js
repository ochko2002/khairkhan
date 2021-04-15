const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: [String],
  price: {
    type: Number,    
  },  
  imageUrl: {
    type: String,
    required: true,
  },
  mobilePhone : [String],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  // createUser: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  // },
  // updateUser: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  // },
  createdAt: {
    type: Date,
    default: new Date()
  }
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);



const Product = mongoose.model("product", productSchema);

module.exports = Product;
