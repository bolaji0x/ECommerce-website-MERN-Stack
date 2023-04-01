const jwt = require('jsonwebtoken');
const { UnAuthenticatedError, UnauthorizedError } = require('../errors/index.js');
const Token = require('../models/Token');
const { attachCookie } = require('../utils');

const auth = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = { userId: payload.userId, role: payload.role };
      return next();
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnAuthenticatedError('Authentication Invalid');
    }

    
    attachCookie({
      res,
      accessToken: { userId: payload.userId },
      refreshToken: existingToken.refreshToken,
    });

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

const authBuyer = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, following: payload.following };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};



module.exports = {auth, authBuyer, authorizePermissions};
