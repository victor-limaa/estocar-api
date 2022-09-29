const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('authorization-token')
    if(!token) return res.status(400).send('Access denied!')

    try{
        userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        res.user = userVerified
        next()
    } catch (err){
        res.status(400).send(err)
    }
}