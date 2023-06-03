'use strict'
const db = require('../db/models/index')

// find user by id
module.exports.findUserByEmail = async (email) => {
  return await db.User.findOne({ where: { email: email } })
}

// create a new user
module.exports.createANewUser = async (payload) => {
  return await db.User.create(payload)
}
