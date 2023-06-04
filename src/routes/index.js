'use strict'
const userRoute = require('./user.route')
const { generateAccessToken } = require('../services/jwt.service')
const jwtControllers = require('../controllers/jwt.controllers')
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require('../middlewares/verifyToken.midleware')

module.exports = (app) => {
  app.get('/', verifyAccessToken, (req, res) => {
    res.send('Home ' + JSON.stringify(req.decodedToken))
  })

  app.get(
    '/api/refresh-token',
    verifyRefreshToken,
    jwtControllers.handleRefreshToken
  )

  app.use('/api/user', userRoute)
}
