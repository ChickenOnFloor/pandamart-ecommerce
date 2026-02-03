const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

router.get('/products', async (req, res) => {
  const { minPrice, maxPrice, inStock, sort } = req.query
  const query = { isApproved: true }

  if (inStock === 'true') query.stock = { $gt: 0 }
  if (minPrice || maxPrice) {
    query.price = {}
    if (minPrice) query.price.$gte = minPrice
    if (maxPrice) query.price.$lte = maxPrice
  }

  let q = Product.find(query).populate('seller', 'username')
  if (sort === 'price_asc') q = q.sort({ price: 1 })
  if (sort === 'price_desc') q = q.sort({ price: -1 })
  if (sort === 'newest') q = q.sort({ createdAt: -1 })

  res.json(await q)
})

router.get('/products/:id', async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    isApproved: true,
  }).populate('seller', 'username')

  if (!product) return res.status(404).json({ message: 'Not found' })
  res.json(product)
})

module.exports = router
