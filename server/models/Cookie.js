const mongoose = require('mongoose')

const cookieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  ingredients: [{ type: String }],
  is_available: { type: Boolean, default: true },
  is_featured: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
}, { timestamps: true })

module.exports = mongoose.model('Cookie', cookieSchema)
