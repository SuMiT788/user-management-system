const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

const services = require('../services/render')
const controller = require('../controller/controller')

// front end
router.get('/', services.login_user)

router.get('/home', services.homeRoutes)

router.get('/add_user', services.add_user)

router.get('/update_user', services.update_user)

// backend API
router.get('/users', auth, controller.find)
router.get('/users/:id', auth, controller.findOne)
router.post('/users', auth, controller.create)
router.put('/users/:id', auth, controller.update)
router.delete('/users/:id', auth, controller.delete)
router.post('/users/login', controller.login)
router.post('/users/logout', auth, controller.logout)
router.post('/users/logoutALL', auth, controller.logoutALL)

module.exports = router