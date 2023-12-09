const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  code: String,
  serialNumber: String,
  barcode: String,
  manufactureDate: Date,
  expiryDate: Date,
  arrivalDate: Date,
  quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", ProductSchema);
