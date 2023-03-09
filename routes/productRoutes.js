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

const authenticateUser = require('../middleware/auth')

router.route('/all').get(getAllProducts)
router.route('/').post(authenticateUser, createProduct).get(authenticateUser, getCurrentUserProduct)

   

router.route('/:id').get(getSingleProduct)
router.route('/:id').delete(authenticateUser, deleteProduct)


router.route('/:id').put(authenticateUser, updateProduct) 

module.exports = router

