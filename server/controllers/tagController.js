const Tag = require('../models/Tag')

exports.getAll = async (req, res) => {
  try {
    const tags = await Tag.find()
    res.json(tags)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const tag = await Tag.create({ name: req.body.name })
    res.status(201).json(tag)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!tag) return res.status(404).json({ message: 'Tag not found' })
    res.json(tag)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id)
    res.json({ message: 'Tag deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}