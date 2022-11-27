const userService = require("./user.service");

async function userRegister(req, res, next) {
    try {
        await userService.userRegister(req.body);
        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
}

async function userLogin(req, res, next) {
    try {
        const token = await userService.userLogin(req.body);
        res.status(200).json({public_token: token, type: 'Bearer'});
    } catch (error) {
        next(error);
    }
}

async function userGetInfo(req, res, next) {
    try {
        const user = req.user;
        const result = await userService.userGetInfo(user);
        res.status(200).json({data: result});
    } catch (error) {
        next(error);
    }
}

async function userUpdateInfo(req, res, next) {
    try {
        const user = req.user;
        const result = await userService.userUpdateInfo(user, req.body);
        res.status(200).json({data: result});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    userRegister,
    userLogin,
    userGetInfo,
    userUpdateInfo
}