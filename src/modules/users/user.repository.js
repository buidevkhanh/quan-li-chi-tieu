const {userModel} = require('./user.collection');

async function create(user) {
    await userModel.create(user);
}

async function getAll() {
    return userModel.find();
}

module.exports = {
    create,
    getAll
}