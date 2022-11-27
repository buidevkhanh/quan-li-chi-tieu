const express = require('express');
const { isLogin } = require('../../libs/middlewares/login');
const { validate } = require('../../libs/middlewares/validation');
const walletController = require('./wallet.controller');
const walletValidSchema  = require('./wallet.validation');

const _router = express.Router();

_router.post('/wallet', [isLogin, validate(walletValidSchema.createWallet), walletController.createWallet]);

_router.patch('/wallet/:id', [isLogin, validate(walletValidSchema.updateWallet), walletController.updateWallet])

_router.delete('/wallet/:id', [isLogin, walletController.deleteWallet]);

_router.get('/wallet', [isLogin, walletController.getAllWallet]);

module.exports = {
    router: _router,
    name: 'wallets'
}