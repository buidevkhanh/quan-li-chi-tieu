const jwt = require('jsonwebtoken');
const { AppEnv } = require('../../enviroment/env');

function signToken(email) {
    return jwt.sign({user: email}, AppEnv.SECRET_STR, { expiresIn: AppEnv.PUBLIC_TOKEN_EXPIRED_TIME});
}

function verifyToken(token) {
    try {
        return jwt.verify(token, AppEnv.SECRET_STR);
    } catch(error){
        return null;
    }
}

module.exports = {
    signToken,
    verifyToken
}