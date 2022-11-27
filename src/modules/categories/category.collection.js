const {mongoose} = require('../../configs/database.cf');
const { AppObject } = require("../../commons/app.object");

const CategorySchemal = mongoose.Schema({
    name: { type: String, required: true},
    user: { type: mongoose.Types.ObjectId, ref: AppObject.COLLECTION.USERS},
    avatar: { type: String, require: false},
    status: {type: String, enum: Object.values(AppObject.ENUM.STATUS), default: AppObject.ENUM.STATUS.ACTIVE}
}, { timestamps: true})

const categoryModel = mongoose.model(AppObject.COLLECTION.CATEGORIES, CategorySchemal);

module.exports = { categoryModel }
 
