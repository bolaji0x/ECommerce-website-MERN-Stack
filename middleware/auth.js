const jwt = require('jsonwebtoken');
const { UnAuthenticatedError } = require('../errors/index.js');
const Token = require('../models/Token');
const { attachCookie } = require('../utils');

const auth = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = { userId: payload.userId };
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

    /*
    attachCookie({ 
      res, 
      refreshToken: existingToken.refreshToken, 
      existingToken: existingToken
    });
    */

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};


module.exports = auth;
