const { getAllUser } = require("./user.service");

async function getAll(req, res, next) {
    try {
        const result = await getAllUser();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    getAll
}