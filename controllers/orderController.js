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
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }

  let orderItems = [];
  let subtotal = 0;

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
  // calculate total
  const total = Number(tax) + Number(shippingFee) + Number(subtotal);
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {

  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId }).populate('createdBy');
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.createdBy);
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


const getSellerOrders = async (req, res) => {
  const products = await Product.find({ createdBy: req.user.userId }).select('_id');
  const productIds = products.map((product) => product._id);
  const orders = await Order.find({ 'orderItems.product': { $in: productIds } }).populate({path: 'orderItems.product', match: { createdBy: req.user.userId }})
              
  const filteredOrderItems = orders.reduce((acc, order) => {
  const orderItems = order.orderItems.filter((item) => {
    return item.product !== null;
  });
  acc.push(...orderItems);
    return acc;
  }, []);

  let orderTotal = 0;
  let totalShippingFee = 0;

  const formattedOrderItems = filteredOrderItems.map((item) => {
    const total = item.price * item.amount;
    orderTotal += total;
    totalShippingFee += item.shippingFee;
    return { ...item.toObject(), total };
  });

  const { status, shippingFee } = orders[0];
  res.status(StatusCodes.OK).json({ 
    status,
    shippingFee,
    totalShippingFee,
    orders: formattedOrderItems, 
    totalOrders: filteredOrderItems.length, 
    total: orderTotal 
  })

  
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
