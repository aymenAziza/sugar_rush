const Cookie = require('../models/Cookie')

const parseArrayField = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
}

exports.getAll = async (req, res) => {
  try {
    const cookies = await Cookie.find().populate('category').populate('tags')
    res.json(cookies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOne = async (req, res) => {
  try {
    const cookie = await Cookie.findById(req.params.id).populate('category').populate('tags')
    if (!cookie) return res.status(404).json({ message: 'Cookie not found' })
    res.json(cookie)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { name, description, price, is_available, is_featured, category } = req.body
    let image = ''
    if (req.file) image = req.file.path
    const cookie = await Cookie.create({
      name,
      description,
      price,
      image,
      ingredients: parseArrayField(req.body.ingredients),
      is_available,
      is_featured,
      category: category || null,
      tags: parseArrayField(req.body.tags),
    })
    res.status(201).json(cookie)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const { name, description, price, is_available, is_featured, category } = req.body
    const cookie = await Cookie.findById(req.params.id)
    if (!cookie) return res.status(404).json({ message: 'Cookie not found' })
    if (req.file) cookie.image = req.file.path
    cookie.name = name ?? cookie.name
    cookie.description = description ?? cookie.description
    cookie.price = price ?? cookie.price
    if (req.body.ingredients !== undefined) cookie.ingredients = parseArrayField(req.body.ingredients)
    cookie.is_available = is_available ?? cookie.is_available
    cookie.is_featured = is_featured ?? cookie.is_featured
    cookie.category = category !== undefined ? category || null : cookie.category
    if (req.body.tags !== undefined) cookie.tags = parseArrayField(req.body.tags)
    await cookie.save()
    res.json(cookie)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Cookie.findByIdAndDelete(req.params.id)
    res.json({ message: 'Cookie deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
