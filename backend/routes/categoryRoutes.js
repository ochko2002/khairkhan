const express = require("express");
const router = express.Router();
//const { protect, authorize } = require("../middleware/protect");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  
} = require("../controller/categoryControllers");


//router.route("/:categoryId/products").get(getCategoryById);

// api/categories/:id/products
const { getCategoryProducts } = require("../controller/productControllers");
router.route("/:categoryid/products").get(getCategoryProducts);

//"/api/v1/categories"
router
  .route("/")
  .get(getCategories)
  .post(createCategory)
  //.post(protect, authorize("admin"), createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory)
  //.put(protect, authorize("admin", "operator"), updateCategory)
  //.delete(protect, authorize("admin"), deleteCategory);

module.exports = router;
