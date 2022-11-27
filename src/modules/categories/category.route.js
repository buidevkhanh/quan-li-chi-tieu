const express = require('express');
const { isLogin } = require('../../libs/middlewares/login');
const { validate } = require('../../libs/middlewares/validation');
const categoryController = require('./category.controller');
const categoryValidSchema  = require('./category.validation')

const _router = express.Router();

_router.post('/category', [isLogin, validate(categoryValidSchema.createCategory), categoryController.createCategory]);

_router.patch('/category/:id', [isLogin, validate(categoryValidSchema.updateCategory), categoryController.updateCategory])

_router.delete('/category/:id', [isLogin, categoryController.deleteCategory]);

_router.get('/category', [isLogin, categoryController.getAllCategory]);

module.exports = {
    router: _router,
    name: 'categories'
}