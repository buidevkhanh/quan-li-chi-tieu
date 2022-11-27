const { AppObject } = require("../../commons/app.object");
const { validFullname } = require("../../libs/strings");
const { userRepository } = require("./user.repository");
const {BadError}  = require('../../libs/errors/base');
const { signToken } = require("../../libs/jwts");
const { set } = require("../../libs/caches");

async function userRegister(userInfo) {
    userInfo.fullname = validFullname(userInfo.fullname);
    userInfo.password = require('crypto').createHash(AppObject.ALGORITHM).update(userInfo.password).digest('hex');
    const userFound = await userRepository.findOne({email: userInfo.email});
    if(userFound) {
        throw new BadError('user already exist');
    }
    await userRepository.create(userInfo);
    set(`user:${userInfo.email}`, Number(new Date()).toString());
}   

async function userLogin(userInfo) {
    userInfo.password = require('crypto').createHash(AppObject.ALGORITHM).update(userInfo.password).digest('hex');
    const userFound = await userRepository.findOne(userInfo);
    if(!userFound) {
        throw new BadError('invalid login information');
    }
    const public_token = signToken(userFound.email);
    return public_token;
}

async function userGetInfo(email) {
    const userFound = await userRepository.findOne({email}).lean();
    if(!userFound) {
        throw new BadError('user not found');
    }
    delete userFound.password;
    delete userFound._id;
    return userFound;
}

async function userUpdateInfo(user, userInfo) {
    const userFound = await userRepository.findOne({user});
    if(!userFound) {
        throw new BadError('user not found');
    };
    for(const key of Object.keys(userInfo)) {
        if(key === 'password') {
            const newpass = require('crypto').createHash(AppObject.ALGORITHM).update(userInfo[key]).digest('hex');
            if(newpass !== userFound.password) {
                userFound.password = newpass;
                set(`user:${userFound.email}`, Number(new Date()).toString());
            }
        } else if (key == "fullname") {
            userFound[fullname] = validFullname(userInfo.fullname);
        } else if (key == 'email') {
            set(`user:${userFound.email}`, Number(new Date()).toString());
            userFound[key] = userInfo[key];
            set(`user:${userInfo[key]}`, Number(new Date()).toString());
        } else {
            userFound[key] = userInfo[key];
        }
    }
    await userFound.save();
}

module.exports = {
    userRegister,
    userLogin,
    userGetInfo,
    userUpdateInfo
}