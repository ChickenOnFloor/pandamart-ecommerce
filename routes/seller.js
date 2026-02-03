const express = require('express')
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const Product = require('../models/Product')
const Order = require('../models/Order')

const router = express.Router()

router.post('/products', auth, role('seller', 'admin'), async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      image: req.body.image,
      seller: req.user.id,
      approved: req.user.role === 'admin',
    })

    res.status(201).json({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: product.image,
      approved: product.approved,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/products', auth, role('seller', 'admin'), async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id })
    const transformedProducts = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
      image: p.image,
      approved: p.approved,
    }))
    res.json(transformedProducts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/products/:id', auth, role('seller', 'admin'), async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id,
    })

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
      approved: product.approved,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/products/:id', auth, role('seller', 'admin'), async (req, res) => {
  try {
    const allowedFields = [
      'name',
      'description',
      'price',
      'stock',
      'category',
      'image',
    ]

    const updates = {}
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })
    if (req.user.role === 'seller') {
      updates.approved = false
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      updates,
      { new: true }
    )

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
      approved: product.approved,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/products/:id', auth, role('seller', 'admin'), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      seller: req.user.id,
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// New stats endpoint for seller dashboard
router.get('/stats', auth, role('seller', 'admin'), async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id })
    
    const totalProducts = products.length
    const approvedProducts = products.filter(p => p.approved).length
    const pendingProducts = totalProducts - approvedProducts

    res.json({
      totalProducts,
      approvedProducts,
      pendingProducts
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/dashboard', auth, role('seller', 'admin'), async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id })

    const totalSales = orders.reduce((sum, o) => sum + o.total, 0)

    res.json({
      totalOrders: orders.length,
      totalSales,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router