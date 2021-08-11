var User = require('../models/user')

// login user
exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token, {
            httpOnly: true,
        })
        // res.send({ user, token })
        res.redirect('/home')
    } catch (e) {
        res.status(400).send({ 'error': e })
    }
}

// logout user with current token
exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.redirect('/')
    } catch (e) {
        res.status(500).send()
    }
}

// logout user from all machines
exports.logoutALL = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.redirect('/')
    } catch (e) {
        res.status(500).send()
    }
}

// create and save new user
exports.create = async (req, res) => {
    console.log(req.body)
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" })
        return
    }

    const user = new User(req.body)

    try {
        await user.save()
        // res.status(201).send(user)
        res.redirect('/add_user')
    } catch (e) {
        res.status(400).send(e.message || "Some error occurred while creating a create operation")
    }
}

// update user info
exports.update = async (req, res) => {
    // store id in variable
    const _id = req.params.id

    for (key in req.body) {
        console.log(`req.body[${key}]: ${req.body[key]}`)
    }

    // check if update param is in allowedUpdates
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'title', 'birthdate']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if update parameter not in allowedUpdates
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // find user by id
        const user = await User.findById(_id)
        console.log(user)
        // if user not found
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        updates.forEach((update) => {
            if (update === 'password') {
                if (user[update] !== req.body[update]) {
                    return user[update] = req.body[update]
                }
            }
            return user[update] = req.body[update]
        })
        await user.save()
        console.log(user)
        res.send(user)
        // res.redirect("/update_user/" + _id)
    } catch (e) {
        res.status(400).send("Error: " + e || "Some error occured while updating data")
    }
}

// delete user
exports.delete = async (req, res) => {
    // Get user id
    _id = req.params.id

    try {
        if (req.params.id !== "610119da2c3de3799fb606ff") {
            // Find user and delete data
            const user = await User.findByIdAndDelete(_id)

            // if user not found
            if (!user) {
                return res.status(404).send({ message: "User not found" })
            }

            res.send({ message: "User was deleted successfully" })
        } else {
            return res.status(500).send({ message: "Could not delete user with id: " + _id })
        }
    } catch (e) {
        res.status(500).send({ error: 'e', message: "Could not delete user with id: " + _id })
    }
}

// view all users
exports.find = async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e.message || "Error Occured while retriving user information")
    }
}

// view particular user with id
exports.findOne = async (req, res) => {
    const _id = req.query.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e.message || "Error Occured while retriving user information")
    }
}
