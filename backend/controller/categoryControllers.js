const Category = require("../models/Category");
const mongoose = require("mongoose");


const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await (await Category.findById(req.params.id)).populate("products");

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = req.body;  
    const newCategory = await Category.create(category);

    res.status(200).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id: _id} = req.params;
    const category = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Энэ дугаар дээр ангилал байхгүй байна!");

  const updateCategory = await Category.findByIdAndUpdate(_id, {...category, _id}, {new: true});

  res.status(201).json(updateCategory);  
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
  
}


const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new MyError(req.params.id + " ID-тэй категори байхгүй байна!.", 400);
    }

    category.remove();
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
