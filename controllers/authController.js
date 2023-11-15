
const userModel = require('../models/user')
const folderModel = require('../models/folder')
const folder = require('../models/folder')

const register = async (req, res) => {
    try {
        let { name, email, password } = req.body
        let user = await userModel.findOne({
            email: email
        })
        if (user) {
            return res.status(500).send('Email is exits')
        }
        let newUser = await userModel.create({
            name: name,
            email: email,
            password: password
        })
        await folderModel.create({
            name: 'My Drive',
            user: newUser._id,
            parent: newUser._id,
            dateCreate: Date.now(),
            size: '',
            type: 'folder',
            path: '/My Drive'
        })
        return res.status(200).send('Register successfully!')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Server error')
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(500).send('Email is not exits')
        }
        if (user.password != password) {
            return res.status(500).send('Password is not correct')
        }
        user.password = ''
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).send('Server error. Please try again!')
    }
}

module.exports = {
    register, login
}