const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
      seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  total: Number,
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
