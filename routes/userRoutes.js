const express = require('express')
const router = express.Router()

const rateLimiter = require('express-rate-limit')

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

const { 
  updateUser,
  getSingleUser,
  
} = require('../controllers/userController.js')

const authenticateUser = require('../middleware/auth.js');


router.route('/updateUser').put(authenticateUser, updateUser)
router.route('/:id').get(getSingleUser)

module.exports = router
