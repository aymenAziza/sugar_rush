const router = require('express').Router()
const { getAll, create, markRead, remove } = require('../controllers/contactController')
const protect = require('../middleware/authMiddleware')

router.get('/', protect, getAll)
router.post('/', create)
router.put('/:id/read', protect, markRead)
router.delete('/:id', protect, remove)

module.exports = router