const express = require('express')
const router = express.Router()

const {
    createProduct,
    getAllProducts,
    getCurrentUserProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController.js')

const {auth, authorizePermissions} = require('../middleware/auth')

router.route('/all').get(getAllProducts)
router.route('/').post([auth, authorizePermissions('admin')], createProduct).get(auth, getCurrentUserProduct)

router.route('/:id').get(getSingleProduct)
router.route('/:id').delete([auth, authorizePermissions('admin')], deleteProduct)


router.route('/:id').put([auth, authorizePermissions('admin')], updateProduct) 

module.exports = router

