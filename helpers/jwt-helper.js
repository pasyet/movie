var jwt = require('jsonwebtoken');

function signin(value){
    return jwt.sign(value, process.env.JWT_SECRET)
}

function verify(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {signin, verify};