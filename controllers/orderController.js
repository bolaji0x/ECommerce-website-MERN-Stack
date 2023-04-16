const Order = require('../models/Order');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue';
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
  }


  let orderItems = [];
  let subtotal = 0;
  let shippingFee = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      );
    }
    const { title, price, images, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      title,
      price,
      images,
      product: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }

  // calculate shippingFee
  const numberOfItems = cartItems.reduce((total, item) => total + item.amount, 0);
  const shippingFeePerItem = 500;
  shippingFee = Math.min(numberOfItems * shippingFeePerItem, 5000);

  // calculate tax of 7.5%
  const taxAmount = subtotal * 0.075;

  // calculate total
  const total = Number(taxAmount) + Number(shippingFee) + Number(subtotal);


  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'NGN',
  });
  
  
  

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax: taxAmount,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ orders, totalOrders: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId }).populate('createdBy');
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  //checkPermissions(req.user, order.createdBy);
  res.status(StatusCodes.OK).json({ order });
};


const getCurrentUserOrders = async (req, res) => {
  const { sort } = req.query
  const queryObject = {
    createdBy: req.user.userId,
  };
  
  // NO AWAIT

  let result = Order.find(queryObject)
    .populate('createdBy', '_id username lastName email');
    

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  // setup pagination
  const page = Number(req.query.page) * 1 || 1;
  const limit = Number(req.query.limit) * 1 || 6;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const orders = await result;

  const totalOrders = await Order.countDocuments(queryObject);
  res.status(StatusCodes.OK).json({ orders, totalOrders })
  
};




/*
const getSellerOrders = async (req, res) => {
  const orders = await Order.find({ 'product.createdBy': req.user._id }).populate('orderItems.product', '_id createdBy');
  
  res.status(StatusCodes.OK).json({ orders, count: orders.length });            
};
*/

const getSellerOrders = async (req, res) => {
  const orders = await Order.find({ 'product.createdBy': req.user.userId }).populate('orderItems.product', '_id createdBy');
  
 
  orders.forEach((order) => {
    order.orderItems = order.orderItems.filter((orderItem) => orderItem.product.createdBy.toString() === req.user.userId.toString());
  });

  const filteredOrders = orders.filter(order => order.orderItems.length > 0)

  res.status(StatusCodes.OK).json({ orders: filteredOrders, totalOrders: filteredOrders.length });
};


const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.createdBy);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  getSellerOrders,
  createOrder,
  updateOrder,
};
