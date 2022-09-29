const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { loginValidate, registerValidade } = require('./validate')

userController = {
    register: async function (req, res) {

        const {error} = registerValidade(req.body)
        if(error) return res.status(400).send(error.message)

        const selectedUser = await User.findOne({email: req.body.email})
        if(selectedUser) return res.status(400).send('Email already exists')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })

        try{
            const savedUser = await user.save()
            res.send(savedUser)
        } catch (err){
            res.status(400).send(err)
        }
    },

    login: async function (req, res) {
        
        const {error} = loginValidate(req.body)
        if(error) return res.status(400).send(error.message)

        const selectedUser = await User.findOne({email: req.body.email})
        if(!selectedUser) return res.status(400).send('Email or password incorrect')

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(400).send('Email or password incorrect')

        const token = jwt.sign({_id: selectedUser._id}, process.env.TOKEN_SECRET)

        res.header('authorization-token', token).send(token)
    }
}

module.exports = userController