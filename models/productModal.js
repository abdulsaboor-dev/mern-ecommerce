const mongoose = require("mongoose");
const { Schema } = mongoose

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    // category: {type: String, required: true}
})

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
