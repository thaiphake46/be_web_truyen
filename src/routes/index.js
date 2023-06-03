'use strict'
const userRoute = require('./user.route')

module.exports = (app) => {
  app.use('/user', userRoute)
}
