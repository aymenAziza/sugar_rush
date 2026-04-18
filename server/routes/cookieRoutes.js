const router = require('express').Router()
const { getAll, getOne, create, update, remove } = require('../controllers/cookieController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', protect, upload.single('image'), create)
router.put('/:id', protect, upload.single('image'), update)
router.delete('/:id', protect, remove)

module.exports = router