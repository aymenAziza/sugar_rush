const Banner = require('../models/Banner')

exports.getAll = async (req, res) => {
  try {
    const banners = await Banner.find()
    res.json(banners)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { title, link, is_active } = req.body
    let image = ''
    if (req.file) image = req.file.path
    const banner = await Banner.create({ title, image, link, is_active })
    res.status(201).json(banner)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const { title, link, is_active } = req.body
    const banner = await Banner.findById(req.params.id)
    if (!banner) return res.status(404).json({ message: 'Banner not found' })
    if (req.file) banner.image = req.file.path
    banner.title = title ?? banner.title
    banner.link = link ?? banner.link
    banner.is_active = is_active ?? banner.is_active
    await banner.save()
    res.json(banner)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id)
    res.json({ message: 'Banner deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}