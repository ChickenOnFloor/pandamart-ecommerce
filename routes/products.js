const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, inStock, sellerId } = req.query
    const filter = { approved: true }
    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }
    if (category && category !== 'all') {
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') }
    }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = parseFloat(minPrice)
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice)
    }
    if (inStock === 'true') {
      filter.stock = { $gt: 0 }
    }
    if (sellerId) {
      filter.seller = sellerId
    }
    
    const products = await Product.find(filter).populate('seller', 'username')
    const transformedProducts = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
      image: p.image,
      sellerId: p.seller._id.toString(),
      seller: {
        name: p.seller.username
      }
    }))
    
    res.json(transformedProducts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    approved: true,
  }).populate('seller', 'username')

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json({
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    image: product.image,
    sellerId: product.seller._id.toString(),
    seller: {
      name: product.seller.username
    }
  })
})

module.exports = router
