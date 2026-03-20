import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z]{3}\d{5}$/,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  finalPrice: Number,
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  specifications: {
    type: Map,
    of: String,
    validate: (v) => v.size > 0,
  },
});

productSchema.pre("save", function (next) {
  this.finalPrice = this.price - (this.price * this.discount) / 100;
  next();
});
const Product = mongoose.model("Product", productSchema);

export default Product;
