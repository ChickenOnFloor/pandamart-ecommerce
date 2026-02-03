const express = require('express')
const auth = require('../middleware/auth')
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')

const router = express.Router()

router.post('/checkout', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart empty' })
  }

  let total = 0
  const items = []

  for (const item of cart.items) {
    const product = item.product

    if (product.stock < item.quantity) {
      return res.status(400).json({ message: `${product.name} out of stock` })
    }

    product.stock -= item.quantity
    await product.save()

    total += product.price * item.quantity
    items.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price,
      seller: product.seller,
    })
  }

  const order = await Order.create({
    user: req.user.id,
    items,
    total,
  })

  cart.items = []
  await cart.save()

  res.json({ message: 'Order placed', order })
})

module.exports = router
