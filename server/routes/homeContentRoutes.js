const router = require('express').Router()
const protect = require('../middleware/authMiddleware')
const { getContent, updateContent } = require('../controllers/homeContentController')

router.get('/', getContent)
router.put('/', protect, updateContent)

module.exports = router
