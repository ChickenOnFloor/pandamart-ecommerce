const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

router.get('/products', async (req, res) => {
  const { minPrice, maxPrice, inStock, sort } = req.query
  const query = { approved: true }

  if (inStock === 'true') query.stock = { $gt: 0 }
  if (minPrice || maxPrice) {
    query.price = {}
    if (minPrice) query.price.$gte = minPrice
    if (maxPrice) query.price.$lte = maxPrice
  }
  
  if (req.query.sellerId) {
    query.seller = req.query.sellerId;
  }

  let q = Product.find(query).populate('seller', 'username')
  if (sort === 'price_asc') q = q.sort({ price: 1 })
  if (sort === 'price_desc') q = q.sort({ price: -1 })
  if (sort === 'newest') q = q.sort({ createdAt: -1 })

  const products = await q;
  const transformedProducts = products.map(p => ({
    _id: p._id.toString(),
    id: p._id.toString(),
    name: p.name,
    description: p.description,
    price: p.price,
    stock: p.stock,
    category: p.category,
    image: p.image,
    sellerId: p.seller ? (typeof p.seller._id !== 'undefined' ? p.seller._id.toString() : null) : null,
    seller: p.seller ? {
      name: p.seller.username
    } : null
  }));
  res.json(transformedProducts)
})

router.get('/products/:id', async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    approved: true,
  }).populate('seller', 'username')

  if (!product) return res.status(404).json({ message: 'Not found' })
  res.json({
    _id: product._id.toString(),
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    image: product.image,
    sellerId: product.seller ? (typeof product.seller._id !== 'undefined' ? product.seller._id.toString() : null) : null,
    seller: product.seller ? {
      name: product.seller.username
    } : null
  })
})

module.exports = router
