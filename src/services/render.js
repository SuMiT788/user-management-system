const axios = require('axios')

// Front end page rendering
exports.login_user = async (req, res) => {
    res.render('login_page')
}

exports.homeRoutes = async (req, res) => {
    try {
        // Make a get request to /users
        console.log('-> Trying to get user information')
        const token = req.cookies.auth_token
        const users = await axios.get('http://localhost:3000/users', { params: { auth_token: token, token_flag: true } })
        console.log(users.data)
        res.render('index', { users: users.data, i: 0 })
    } catch (e) {
        res.send(e)
    }
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = async (req, res) => {
    try {
        const token = req.cookies.auth_token
        const user = await axios.get('http://localhost:3000/user', { params: { id: req.query.id, auth_token: token, token_flag: true } })
        console.log(user.data)
        res.render("update_user", { user: user.data })
    } catch (e) {
        res.send(e)
    }
    // res.render('update_user')
}