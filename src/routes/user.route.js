const router = require('express').Router()
const controllers = require('../controllers/user.controller')

router.get('/', controllers.getUser)

module.exports = router
