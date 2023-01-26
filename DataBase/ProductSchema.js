const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

  id: Number,
  title: String,
  brand: String,
  category: String,
  rating: Number,
  stock: Number,
  size: String,
  color: String,
  quantity: Number,
  description: String,
  price: Number,
  discountPercentage: Number,
  deliveryCharge: Number,
  total_amount: Number,
  promoCode: String,
  inline_remote: String,
  impedance: String,
  MinimumFrequencyResponse: String,
  MaximumFrequencyResponse: String,
  DomesticWarranty: String,
  WarrantySummary: String,
  CoveredInWarranty: String,
  thumbnail: String,
  images:Array
    
})
module.exports = mongoose.model('products', ProductSchema);

