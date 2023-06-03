'use strict'
var bcrypt = require('bcryptjs')
const db = require('../db/models/index')

module.exports.signupUser = async (req, res) => {
  const { password, email } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashPw = bcrypt.hashSync(password, salt)

  let isAuthor = false
  if (req.path === '/signup/author') {
    isAuthor = true
  }

  // kiểm tra email tồn tại trong db
  try {
    const user = await db.User.findOne({ where: { email: email } })
    if (user) {
      return res.json({ message: 'Email đã tồn tại' })
    }
  } catch (error) {
    return res.json({ error })
  }

  // tạo mới user vào db
  try {
    const userBody = { ...req.body, password: hashPw, isAuthor }
    const user = await db.User.create(userBody)
    res.json({ message: 'Đăng ký thành công' })
  } catch (error) {
    res.json({ error })
  }
}
