const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

CategorySchema.plugin(mongoosePaginate);
const Category = mongoose.model("category", CategorySchema);

module.exports = Category;