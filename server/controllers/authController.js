const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' })
    res.json({ token: generateToken(admin._id), admin: { id: admin._id, name: admin.name, email: admin.email } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getMe = async (req, res) => {
  res.json(req.admin)
}