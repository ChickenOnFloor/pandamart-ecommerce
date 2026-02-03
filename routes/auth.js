const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({
    username: name,
    email,
    password: hashed,
  })

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.cookie('token', token, COOKIE_OPTIONS)

  res.status(201).json({
    id: user._id.toString(),
    email: user.email,
    name: user.username,
    role: user.role,
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.cookie('token', token, COOKIE_OPTIONS)

  res.json({
    id: user._id.toString(),
    email: user.email,
    name: user.username,
    role: user.role,
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    ...COOKIE_OPTIONS,
    maxAge: undefined,
  })

  res.json({ message: 'Logged out' })
})

router.get('/me', auth, async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const user = await User.findById(req.user.id).select('-password')
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json({
    id: user._id.toString(),
    email: user.email,
    name: user.username,
    role: user.role,
  })
})

module.exports = router
