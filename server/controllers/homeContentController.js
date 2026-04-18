const HomeContent = require('../models/HomeContent')

const getOrCreateContent = async () => {
  let content = await HomeContent.findOne()
  if (!content) content = await HomeContent.create({})
  return content
}

exports.getContent = async (req, res) => {
  try {
    const content = await getOrCreateContent()
    res.json(content)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateContent = async (req, res) => {
  try {
    const content = await getOrCreateContent()
    const fields = ['heroTitle', 'heroSubtitle', 'featuredTitle', 'featuredSubtitle', 'aboutTitle', 'aboutText']

    fields.forEach((field) => {
      if (req.body[field] !== undefined) content[field] = req.body[field]
    })

    await content.save()
    res.json(content)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
