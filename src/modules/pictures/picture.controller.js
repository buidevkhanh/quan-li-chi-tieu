const path = require('path');
const fs = require('fs');
const { BadError } = require('../../libs/errors/base');

async function upload(req, res, next) {
    try {
        res.status(200).json({path: req.file.filename, size: req.file.size});
    } catch (error) {
        next(new BadError(`Upload error`));
    }
}

async function getPicture(req, res, next) {
    try {
        const filePath = path.normalize(path.join(__dirname, `../../uploads/images/${req.params.image}`));
        fs.readFileSync(filePath);
        res.sendFile(filePath);
    } catch (error) {
        next(new BadError(`File not found`));
    }
}

module.exports = {
    getPicture,
    upload
}