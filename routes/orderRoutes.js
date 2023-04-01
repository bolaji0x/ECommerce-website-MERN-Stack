const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orderController');

const {auth, authBuyer, authorizePermissions} = require('../middleware/auth.js');

router
  .route('/')
  .post(auth, createOrder)
  .get([auth, authorizePermissions('admin')], getAllOrders);

router.route('/showAllMyOrders').get(auth, getCurrentUserOrders);

router
  .route('/:id')
  .get([auth, authorizePermissions('admin')], getSingleOrder)
  .patch([auth, authorizePermissions('admin')], updateOrder);

module.exports = router;
