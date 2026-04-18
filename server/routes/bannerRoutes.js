const router = require('express').Router()
const { getAll, create, update, remove } = require('../controllers/bannerController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

router.get('/', getAll)
router.post('/', protect, upload.single('image'), create)
router.put('/:id', protect, upload.single('image'), update)
router.delete('/:id', protect, remove)

module.exports = router