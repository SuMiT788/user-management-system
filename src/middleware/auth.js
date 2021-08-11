const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Middleware method used for user authorization
const auth = async (req, res, next) => {
    try {
        var token
        // const token = req.header('Authorization').replace('Bearer ', '')
        if (req.query.token_flag) {
            token = req.query.auth_token

        } else {
            token = req.cookies.auth_token
        }

        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            console.log('-> Please authenticate')
            throw new Error()
        }

        console.log('-> User authenticated')
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth