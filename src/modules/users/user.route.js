const express = require('express');
const { getAll } = require('./user.controller');

const _router = express.Router();

_router.get('/user', [getAll]);

module.exports = {
    router: _router,
    name: 'users'
}