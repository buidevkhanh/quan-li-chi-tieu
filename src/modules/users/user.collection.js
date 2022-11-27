const {mongoose} = require('../../configs/database.cf');
const { AppObject } = require("../../commons/app.object");

const UserSchemal = mongoose.Schema({
    email: { type: String, require: true},
    password: { type: String, require: true},
    fullname: { type: String, require: true},
    avatar: { type: String, require: false}
}, { timestamps: true})

const userModel = mongoose.model(AppObject.COLLECTION.USERS, UserSchemal);

module.exports = { userModel }
 
