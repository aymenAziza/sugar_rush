const Category = require('../models/Category')

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOne = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) return res.status(404).json({ message: 'Category not found' })
    res.json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { name, slug } = req.body
    let image = ''
    if (req.file) image = req.file.path
    const category = await Category.create({ name, slug, image })
    res.status(201).json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const { name, slug } = req.body
    const category = await Category.findById(req.params.id)
    if (!category) return res.status(404).json({ message: 'Category not found' })
    if (req.file) category.image = req.file.path
    category.name = name ?? category.name
    category.slug = slug ?? category.slug
    await category.save()
    res.json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.json({ message: 'Category deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}