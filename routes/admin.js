const express = require('express')
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const User = require('../models/User')
const Product = require('../models/Product')

const router = express.Router()

router.get('/users', auth, role('admin'), async (req, res) => {
  const users = await User.find().select('-password')
  const transformedUsers = users.map(u => ({
    id: u._id.toString(),
    name: u.username,
    email: u.email,
    role: u.role,
  }))
  res.json(transformedUsers)
})

router.get('/products', auth, role('admin'), async (req, res) => {
  try {
    const { approved } = req.query
    const filter = {}
    
    if (approved === 'true') filter.approved = true
    if (approved === 'false') filter.approved = false
    
    const products = await Product.find(filter).populate('seller', 'username')
    const transformedProducts = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      image: p.image || '',
      approved: p.approved,
      seller: p.seller ? {
        name: p.seller.username,
      } : null,
    }))
    
    res.json(transformedProducts)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.patch('/products/:id/approve', auth, role('admin'), async (req, res) => {
  res.json(
    await Product.findByIdAndUpdate(req.params.id, { approved: true }, { new: true })
  )
})

router.delete('/users/:id', auth, role('admin'), async (req, res) => {
  try {
    const userId = req.params.id
    await Product.deleteMany({ seller: userId })
    const user = await User.findByIdAndDelete(userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json({ message: 'User and related products deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/products/:id', auth, role('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    res.json({ message: 'Product deleted by admin' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/users/:id', auth, role('admin'), async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const products = await Product.find({ seller: userId })
    
    res.json({
      id: user._id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      products: products.map(p => ({
        id: p._id.toString(),
        name: p.name,
        price: p.price,
        approved: p.approved,
      })),
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.patch('/users/:id/role', auth, role('admin'), async (req, res) => {
  try {
    const { role: newRole } = req.body
    if (!['user', 'seller', 'admin'].includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role' })
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: newRole },
      { new: true }
    ).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json({
      id: user._id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})


// Get admin stats
router.get('/stats', auth, role('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const pendingApprovals = await Product.countDocuments({ approved: false });
    
    res.json({
      totalUsers,
      totalProducts,
      pendingApprovals,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router
