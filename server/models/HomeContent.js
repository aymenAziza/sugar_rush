const mongoose = require('mongoose')

const homeContentSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'Small-batch cookies baked for late cravings, coffee breaks, and gift boxes.' },
  heroSubtitle: { type: String, default: 'Browse the Sugar Rush collection, discover signature flavours, and contact us for custom requests, events, or seasonal specials.' },
  featuredTitle: { type: String, default: 'Customer Favorites' },
  featuredSubtitle: { type: String, default: 'A selection of the cookies people ask for the most, from gooey classics to rich chocolate-loaded bakes.' },
  aboutTitle: { type: String, default: 'About Sugar Rush' },
  aboutText: { type: String, default: 'Sugar Rush is a cookie catalogue built around simple browsing: rich flavours, soft centers, quality ingredients, and a warm homemade feel.' },
}, { timestamps: true })

module.exports = mongoose.model('HomeContent', homeContentSchema)
