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


router.route('/').post(createProduct).get(getCurrentUserProduct)

   

router.route('/:id').get(getSingleProduct)
router.route('/:id').delete(deleteProduct)
router.route('/account/:id').get(getAllProducts)

router.route('/:id').put(updateProduct) 

module.exports = router

