const Product = require('../models/Product.js')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const cloudinary = require("cloudinary");
const CustomError = require('../errors')
const checkPermissions = require('../utils/checkPermissions')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const createProduct = async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload_large(images[i], {
      folder: "products",
      chunk_size: 6000000,
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.createdBy = req.user.userId;

  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({product});
}

const getCurrentUserProduct = async (req, res) => {
    const { sort } = req.query
    const queryObject = {
      createdBy: req.user.userId,
    }

    let result = Product.find(queryObject)
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    
    // setup pagination
    const page = Number(req.query.page) * 1 || 1;
    const limit = Number(req.query.limit) * 1 || 6;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;

    const totalProducts = await Product.countDocuments(queryObject);
    res.status(StatusCodes.OK).json({ products, totalProducts })
}


const getAllProducts = async (req, res) => {
  const { sort } = req.query
  const queryObject = {
    createdBy: req.params.id,
  }

  let result = Product.find(queryObject).populate('createdBy', '_id username')
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    
    // setup pagination
    const page = Number(req.query.page) * 1 || 1;
    const limit = Number(req.query.limit) * 1 || 6;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;

    const totalProducts = await Product.countDocuments(queryObject);
    res.status(StatusCodes.OK).json({ products, totalProducts })

}


const getSingleProduct = async (req, res) => {
  const {id: productId} = req.params
  const product = await Product.findOne({ _id: productId })
    .populate('createdBy', '_id username images')


  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });    
}

const updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    product,
  });
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params

  const product = await Product.findOne({ _id: productId })

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id :${productId}`)
  }

  checkPermissions(req.user, product.createdBy)

  await product.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed' })
}


module.exports = {
    createProduct,
    getAllProducts,
    getCurrentUserProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}

