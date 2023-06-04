'use strict'
require('dotenv').config()
var bcrypt = require('bcryptjs')
const { createANewUser, findUserByEmail } = require('../services/user.service')
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../services/jwt.service')

module.exports.signupUser = async (req, res) => {
  const { password, email } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashPw = bcrypt.hashSync(password, salt)

  // kiểm tra xem route có phải là đăng ký tác giả không
  let isAuthor = false
  if (req.path === '/signup/author') {
    isAuthor = true
  }

  // kiểm tra email tồn tại trong db
  try {
    const user = await findUserByEmail(email)
    if (user) {
      return res.json({ message: 'Email đã tồn tại' })
    }
  } catch (error) {
    return res.json({ error })
  }

  // tạo mới user vào db
  try {
    const userBody = { ...req.body, password: hashPw, isAuthor }
    await createANewUser(userBody)
    res.json({ message: 'Đăng ký thành công' })
  } catch (error) {
    res.json({ error })
  }
}

module.exports.signinUser = async (req, res) => {
  const { email, password } = req.body
  // kiểm tra đúng email và mật khẩu trong db
  try {
    const user = await findUserByEmail(email)
    let equalPw = bcrypt.compareSync(password, user.password)
    if (user && equalPw) {
      const info = { id: user.id, name: user.name, isAuthor: user.isAuthor }

      return res.json({
        message: 'Đăng nhập thành công',
        user: info,
        token: {
          accessToken: generateAccessToken(info),
          refreshToken: generateRefreshToken(info),
        },
      })
    } else {
      return res.json({
        message: 'Tài khoản hoặc mật khẩu không chính xác',
      })
    }
  } catch (error) {
    return res.json({ error })
  }
}
