const express = require("express");
//const { protect, authorize } = require("../middleware/protect");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,

} = require("../controller/productControllers");

// router.get("/", getProducts);
// router.get("/:id", getProductById);

//"/api/v1/books"
router
  .route("/")
  .get(getProducts)
  .post(createProduct)
  //.post(protect, authorize("admin", "operator"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct)
  //.delete(protect, authorize("admin", "operator"), deleteProduct)
  //.put(protect, authorize("admin", "operator"), updateProduct);

router
  .route("/:id/upload-photo")
  //.put(protect, authorize("admin", "operator"), uploadProductPhoto);


module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   getProducts,
//   getProductById,
// } = require("../controller/productControllers");

// router.get("/", getProducts);
// router.get("/:id", getProductById);

// module.exports = router;
