require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.verifyAccessToken = (req, res, next) => {
  // authorization: Bearer <token>
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.sendStatus(403)
    }
    req.decodedToken = decoded
    next()
  })
}

module.exports.verifyRefreshToken = (req, res, next) => {
  const token = req.body.refreshToken
  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.sendStatus(403)
    }
    req.decodedToken = decoded
    next()
  })
}
