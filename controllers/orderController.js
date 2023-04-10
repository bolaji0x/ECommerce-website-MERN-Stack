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
  const orders = await Order.find({});
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



const getSellerOrders = async (req, res) => {
  const products = await Product.find({ createdBy: req.user.userId }).select('_id');
  const productIds = products.map((product) => product._id);
  const orders = await Order.find({ 'orderItems.product': { $in: productIds } })
    .populate(
    {path: 'orderItems.product', 
    populate: {
    path: 'createdBy',
    select: '_id username lastName'}, 
    match: { createdBy: req.user.userId }
  })
  .populate({
    path: 'createdBy',
    select: '_id username lastName email'
  });
              
  const filteredOrderItems = orders.reduce((acc, order) => {
  const orderItems = order.orderItems.filter((item) => {
    return item.product !== null;
  });
  acc.push(...orderItems);
    return acc;
  }, []);

  let orderTotal = 0;

  const formattedOrderItems = filteredOrderItems.map((item) => {
    const total = item.price * item.amount;
    orderTotal += total;
    
    return { ...item.toObject(), total };
  });

  const { _id, tax, status, shippingFee, createdBy} = orders[0];
  res.status(StatusCodes.OK).json({ 
    orders, 
    totalOrders: filteredOrderItems.length, 
    
    
  })

  
};



/*
const getSellerOrders = async (req, res) => {
  const orderItems = await Order.find({ createdBy: req.user.userId }); // Filter order items by current user
    const productIds = await Product.find({ createdBy: req.user.userId }).distinct('_id'); // Get IDs of products created by current user
    const orderItemsForCurrentUser = orderItems.filter(item => productIds.includes(item.product.toString())); // Filter order items by product IDs created by current user
    const totalOrders = orderItemsForCurrentUser.length;
    return res.status(200).json({ orders: orderItemsForCurrentUser, totalOrders });
  
}

*/

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
