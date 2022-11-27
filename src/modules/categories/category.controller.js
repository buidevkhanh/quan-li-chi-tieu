const categoryService = require('./category.service');

async function createCategory(req, res, next) {
    try {
        await categoryService.createCategory(req.body, req.user);
        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
}

async function updateCategory(req, res, next) {
    try {
        await categoryService.updateCategory(req.body, req.params.id, req.user);
        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
}

async function deleteCategory(req, res, next) {
    try {
        await categoryService.deleteCategory(req.params.id, req.user);
        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
}

async function getAllCategory(req, res, next) {
    try {
        const result = await categoryService.getAllCategory(req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
}