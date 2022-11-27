const express = require('express');
const pictureController = require('./picture.controller');
const _router = express.Router();
const path = require('path');
const id = require('uniqid');
const multer = require('multer');
const { BadError } = require('../../libs/errors/base');
const { isLogin } = require('../../libs/middlewares/login');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,  path.normalize(path.join(__dirname, `../../uploads/images`)))
    },
    filename: function(req, file, cb) {
        cb(null, `${id()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = function(req, file, cb) {
    if(!file.mimetype.includes('image')) {
        cb(new BadError('Unsupported file format'), false);
    }
    else cb(null, true);
}

_router.get('/albums/:image', [pictureController.getPicture]);

_router.post('/albums/upload', [isLogin, multer({storage, fileFilter}).single('avatar'), pictureController.upload])

module.exports = {
    router: _router,
    name: 'pictures'
}