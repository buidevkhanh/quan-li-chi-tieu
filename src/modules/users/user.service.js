const { AppObject } = require("../../commons/app.object");
const { validFullname } = require("../../libs/strings");
const { userRepository } = require("./user.repository");
const {BadError}  = require('../../libs/errors/base');
const { signToken } = require("../../libs/jwts");

async function userRegister(userInfo) {
    userInfo.fullname = validFullname(userInfo.fullname);
    userInfo.password = require('crypto').createHash(AppObject.ALGORITHM).update(userInfo.password).digest('hex');
    const userFound = await userRepository.findOne({email: userInfo.email});
    if(userFound) {
        throw new BadError('user already exist');
    }
    await userRepository.create(userInfo);
}   

async function userLogin(userInfo) {
    userInfo.password = require('crypto').createHash(AppObject.ALGORITHM).update(userInfo.password).digest('hex');
    const userFound = await userRepository.findOne(userInfo).count();
    if(!userFound) {
        throw new BadError('invalid login information');
    }
    const public_token = signToken(userFound.email);
    return public_token;
}

module.exports = {
    userRegister,
    userLogin
}