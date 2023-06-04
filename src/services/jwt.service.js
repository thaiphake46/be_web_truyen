const jwt = require('jsonwebtoken')

module.exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
}

module.exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' })
}
