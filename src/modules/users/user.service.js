const { getAll } = require("./user.repository")

async function getAllUser() {
    return getAll();
}

module.exports = {
    getAllUser
}