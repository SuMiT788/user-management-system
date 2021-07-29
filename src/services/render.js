const axios = require('axios')

// Front end page rendering
exports.login_user = async (req, res) => {
    res.render('login_page')
}

exports.homeRoutes = async (req, res) => {
    try {
        // Make a get request to /users
        const users = await axios.get('http://localhost:3000/users')
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
        const user = await axios.get('http://localhost:3000/users', { params: { id: req.query.id } })
        res.render("update_user", { user: user.data })
    } catch (e) {
        res.send(e)
    }
    // res.render('update_user')
}