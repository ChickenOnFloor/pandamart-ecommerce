const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, default: 'Other' },
    image: { type: String, default: '' },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
