const { default: mongoose } = require("mongoose");
const { AppObject } = require("../../commons/app.object");
const { BadError } = require("../../libs/errors/base");
const { userRepository } = require("../users/user.repository");
const {categoryRepository} = require("./category.repository");

async function createCategory(category, email) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    const categoryFound = await categoryRepository.findOne({user: userFound._id, status: AppObject.ENUM.STATUS.ACTIVE, name: category.name});
    if(categoryFound) {
        throw new BadError('category name already exist');
    }
    category.user = userFound._id.toString();
    await categoryRepository.create(category);
}

async function updateCategory(categoryInfo, categoryId, email) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    const categoryFound = await categoryRepository.findOne({user: userFound._id, _id: mongoose.Types.ObjectId(categoryId), status: AppObject.ENUM.STATUS.ACTIVE});
    if(!categoryFound) {
        throw new BadError('category not found');
    }
    for(const key of Object.keys(categoryInfo)) {
        if(key === "name") {
            const existCategory = await categoryRepository.findOne({user: userFound._id, name: categoryInfo.name, status: AppObject.ENUM.STATUS.ACTIVE});
            if(existCategory) {
                throw new BadError('category name already exist');
            }
        }
        categoryFound[key] = categoryInfo[key];
    }   
    await categoryFound.save();
}

async function deleteCategory(categoryId, email) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    const categoryFound = await categoryRepository.findOne({user: userFound._id, _id: mongoose.Types.ObjectId(categoryId), status: AppObject.ENUM.STATUS.ACTIVE});
    if(!categoryFound) {
        throw new BadError('category not found');
    }
    categoryFound.status = AppObject.ENUM.STATUS.DELETED;
    await categoryFound.save();
}

async function getAllCategory(email) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    
    const listCate = await categoryRepository.find({user: userFound._id, status: AppObject.ENUM.STATUS.ACTIVE});

    return { data: listCate}
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
}