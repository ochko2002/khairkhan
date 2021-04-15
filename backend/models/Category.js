const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Категорийн нэрийг оруулна уу"],
  },
  description: {
    type: String,    
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

categorySchema.pre("remove", async function (next) {
  console.log("removing ....");
  await this.model("Product").deleteMany({ category: this._id });
  next();
});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
