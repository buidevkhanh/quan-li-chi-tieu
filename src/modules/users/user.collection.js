const {mongoose} = require('../../configs/database.cf');
const { AppObject } = require("../../commons/app.object");

const UserSchemal = mongoose.Schema({
    username: { type: String, require: true},
    password: { type: String, require: true},
    email: { type: String, require: true},
    public_token: { type: String, require: false},
    fullname: { type: String, require: true}
}, { timestamps: true})

const userModel = mongoose.model(AppObject.COLLECTION.USERS, UserSchemal);

module.exports = { userModel }
 
