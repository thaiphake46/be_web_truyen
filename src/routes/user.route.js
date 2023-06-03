'use strict'
const router = require('express').Router()
const controllers = require('../controllers/user.controller')

router.post('/signin', controllers.signinUser) // signin user

router.post('/signup', controllers.signupUser) // signup normal user

router.post('/signup/author', controllers.signupUser) // signup author user

module.exports = router
