const jwt = require('jsonwebtoken');
const config = require('../config/config.js')

function verifyToken (req, res, next){
    const token =  req.headers['x-access-token'];
   if(!token){
    return res.status(401).json({
        auth:false,
        message: 'No token provided'
    });
  }
  const decode = jwt.verify(token, config.secret);
  req.userId = decode.id;
  next();
}
module.exports = verifyToken;