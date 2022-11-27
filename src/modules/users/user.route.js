const express = require('express');
const { isLogin } = require('../../libs/middlewares/login');
const { validate } = require('../../libs/middlewares/validation');
const { userRegister, userLogin, userGetInfo , userUpdateInfo} = require('./user.controller');
const { userReg, userLog } = require('./user.validation');

const _router = express.Router();

_router.post('/user/register', [validate(userReg), userRegister]);

_router.post('/user/login', [validate(userLog), userLogin]);

_router.get('/user', [isLogin, userGetInfo]);

_router.patch('/user', [isLogin, userUpdateInfo]);

module.exports = {
    router: _router,
    name: 'users'
}