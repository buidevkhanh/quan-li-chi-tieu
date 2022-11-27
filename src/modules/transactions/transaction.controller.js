const transactionService = require('./transaction.service');

async function createTransaction(req, res, next) {
    try {
        await transactionService.createTransaction(req.user, req.body); 
        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
}

async function statistic(req, res, next) {
    try {
        const result = await transactionService.statistic(req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createTransaction,
    statistic
}