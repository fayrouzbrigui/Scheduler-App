const jwt = require("jsonwebtoken");
const {secretKey} = require("../configuration/jwtConfig");

function generateToken(user){
    const playload = {
        id : user._id,
        email : user.email
    }

    return jwt.sign(playload, secretKey, {expiresIn : "1h"});
};

module.exports = {
    generateToken
};