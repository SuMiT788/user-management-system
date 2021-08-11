const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

const services = require('../services/render')
const controller = require('../controller/controller')

// front end
router.get('/', services.login_user)
router.get('/home', auth, services.homeRoutes)
router.get('/add_user', auth, services.add_user)
router.get('/update_user', auth, services.update_user)

// backend API
router.get('/users', auth, controller.find)
router.get('/user', auth, controller.findOne)
router.post('/users', auth, controller.create)
router.put('/users/:id', auth, controller.update)
router.delete('/users/:id', auth, controller.delete)
router.post('/users/login', controller.login)
router.get('/users/logout', auth, controller.logout)
router.get('/users/logoutALL', auth, controller.logoutALL)

module.exports = router