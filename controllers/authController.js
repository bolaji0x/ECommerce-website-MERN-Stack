const User = require ('../models/User.js')
const { StatusCodes } = require ('http-status-codes')
const { BadRequestError, UnAuthenticatedError } = require ('../errors/index.js')
const attachCookie = require('../utils/attachCookie.js')
const cloudinary = require("cloudinary")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const register = async (req, res) => {
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
        chunk_size: 6000000
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    const { email, username, password } = req.body
  
    if (!email || !username || !password ) {
      throw new BadRequestError('please provide all values')
    }
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
      throw new BadRequestError('Email already in use')
    }
    const user = await User.create(req.body)
  
    const token = user.createJWT()
    attachCookie({ res, token });
    res.status(StatusCodes.CREATED).json({
        user: {
          images: user.images,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phoneNo: user.phoneNo,
          address: user.address
        },
        address: user.address
    })
}

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ username }).select('+password')
    if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
  
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    attachCookie({ res, token });
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, address: user.address })
}
  
const updateUser = async (req, res) => {
  let user = await User.findById(req.user.userId);

  if (!user) {
    throw new CustomError.NotFoundError("User not found");
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
    for (let i = 0; i < user.images.length; i++) {
      await cloudinary.v2.uploader.destroy(user.images[i].public_id);
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

  user = await User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const token = user.createJWT()
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({ user, token, address: user.address })
}

const getSingleUser = async (req, res) => {
    const {id: userId} = req.params
    const user = await User.findOne({_id: userId}).select('-password')
    if(!user) {
        throw new CustomError.NotFoundError(`Cant find user with id: ${req.params.username}`)
    }
    res.status(StatusCodes.OK).json({ user })
}


const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({ user, address: user.address });
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = { 
  register,
  login,
  updateUser,
  getSingleUser,
  getCurrentUser, 
  logout
}

