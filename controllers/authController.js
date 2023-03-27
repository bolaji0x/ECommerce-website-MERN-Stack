const User = require ('../models/User.js')
const { StatusCodes } = require ('http-status-codes')
const { BadRequestError, UnAuthenticatedError } = require ('../errors/index.js')
const attachCookie = require('../utils/attachCookie.js')
const Token = require('../models/Token');

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
  
    const existingToken = user.createJWT()

    // create refresh token
    let refreshToken = '';
    refreshToken = existingToken.refreshToken;
    attachCookie({ res, accessToken: existingToken, refreshToken });
    
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

    const existingToken = user.createJWT()

    // create refresh token
    let refreshToken = '';

    refreshToken = existingToken.refreshToken;
    attachCookie({ res, accessToken: existingToken, refreshToken });
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, address: user.address })
}


const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, address: user.address });
}

const logout = async (req, res) => {
  //await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};



module.exports = { 
  register,
  login,
  getCurrentUser, 
  logout
}

