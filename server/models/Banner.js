const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  is_active: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Banner', bannerSchema)