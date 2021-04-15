const Product = require("../models/Product");
const Category = require("../models/Category");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//api/categories/:catId/products
const getCategoryProducts = async (req, res) => {
  try {
    const products = await Product.find({category: req.params.categoryId });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
  

}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  const product = req.body;

  const newProduct = new Product.create();
  try {
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id: _id} = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Энэ дугаар дээр бүтээгдэхүүн байхгүй байна!");

  const updateProduct = await Product.findByIdAndUpdate(_id, product, {new: true});

  res.status(201).json(updateProduct);  
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
  
}


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new MyError(req.params.id + " дугаартай бүтээгдэхүүн байхгүй байна!", 400);
    }

    product.remove();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
}

module.exports = {
  getProducts,
  getCategoryProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
