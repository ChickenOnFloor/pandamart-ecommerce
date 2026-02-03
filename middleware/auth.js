const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log('Cookies received:', req.cookies) // 👈 ADD THIS

  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ message: 'No token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
