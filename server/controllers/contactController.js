const ContactMessage = require('../models/ContactMessage')

exports.getAll = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { name, email, message } = req.body
    const msg = await ContactMessage.create({ name, email, message })
    res.status(201).json(msg)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.markRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { is_read: true }, { new: true })
    if (!msg) return res.status(404).json({ message: 'Message not found' })
    res.json(msg)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id)
    res.json({ message: 'Message deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}