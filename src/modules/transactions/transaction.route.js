const express = require('express');
const { isLogin } = require('../../libs/middlewares/login');
const { validate } = require('../../libs/middlewares/validation');
const transactionController = require('./transaction.controller');
const { createTransaction } = require('./transaction.validation');

const _router = express.Router();

_router.post('/transaction', [isLogin, validate(createTransaction), transactionController.createTransaction]);

_router.get('/transaction/statistic', [isLogin, transactionController.statistic]);

module.exports = {
    router: _router,
    name: 'transactions'
}