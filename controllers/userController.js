const User = require ('../models/User.js')
const { StatusCodes } = require ('http-status-codes')

const attachCookie = require('../utils/attachCookie.js')
const cloudinary = require("cloudinary")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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
  
    const existingToken = user.createJWT()

    // create refresh token
    let refreshToken = '';
    refreshToken = existingToken.refreshToken;
    attachCookie({ res, refreshToken, existingToken });
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


module.exports = { 
    updateUser,
    getSingleUser,
    
  }