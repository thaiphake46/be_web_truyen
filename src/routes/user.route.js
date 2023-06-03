'use strict'
const router = require('express').Router()
const controllers = require('../controllers/user.controller')

router.post('/signin')

router.post('/signup', controllers.signupUser) // normal user

router.post('/signup/author', controllers.signupUser) // author user
// router.post('/signup/author', controllers.signupUserAuthor) // author user

module.exports = router
