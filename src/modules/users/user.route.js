const express = require('express');
const { validate } = require('../../libs/middlewares/validation');
const { userRegister, userLogin } = require('./user.controller');
const { userReg, userLog } = require('./user.validation');

const _router = express.Router();

_router.post('/user/register', [validate(userReg), userRegister]);

_router.post('/user/login', [validate(userLog), userLogin])

module.exports = {
    router: _router,
    name: 'users'
}