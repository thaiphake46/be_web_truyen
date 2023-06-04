const { generateAccessToken } = require('../services/jwt.service')

module.exports.handleRefreshToken = (req, res) => {
  const { id, name, isAuthor } = req.decodedToken
  const accessToken = generateAccessToken({ id, name, isAuthor })
  res.json({ accessToken })
}
