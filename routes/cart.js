const express = require('express')
const auth = require('../middleware/auth')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

const router = express.Router()


router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
  
  if (!cart || cart.items.length === 0) {
    return res.json({ items: [], total: 0 })
  }

  const items = cart.items.map(item => ({
    productId: item.product._id.toString(),
    productName: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.image || '',
  }))

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  res.json({ items, total })
})

router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body

  const product = await Product.findById(productId)
  if (!product || !product.approved) {
    return res.status(400).json({ message: 'Invalid product' })
  }

  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] })
  }

  const item = cart.items.find(i => i.product.toString() === productId)
  if (item) {
    item.quantity = quantity
  } else {
    cart.items.push({ product: productId, quantity })
  }

  await cart.save()
  res.json({ message: 'Cart updated' })
})

router.delete('/remove/:productId', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
  cart.items = cart.items.filter(
    i => i.product.toString() !== req.params.productId
  )
  await cart.save()
  res.json(cart)
})

module.exports = router
