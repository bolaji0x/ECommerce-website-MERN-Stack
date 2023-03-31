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

const {auth} = require('../middleware/auth')

router.route('/all').get(getAllProducts)
router.route('/').post(auth, createProduct).get(auth, getCurrentUserProduct)

   

router.route('/:id').get(getSingleProduct)
router.route('/:id').delete(auth, deleteProduct)


router.route('/:id').put(auth, updateProduct) 

module.exports = router

