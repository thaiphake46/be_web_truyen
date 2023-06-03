'use strict'
const db = require('../db/models/index')

module.exports.findUserByEmail = async (email) => {
  return await db.User.findOne({ where: { email: email } })
}

module.exports.createANewUser = async (payload) => {
  return await db.User.create(payload)
}
