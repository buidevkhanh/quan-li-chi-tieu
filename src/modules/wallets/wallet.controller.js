const walletService = require('./wallet.service');

async function createWallet(req, res, next) {
    try {
        await walletService.createWallet(req.body, req.user);
        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
}

async function updateWallet(req, res, next) {
    try {
        await walletService.updateWallet(req.body, req.params.id, req.user);
        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
}

async function deleteWallet(req, res, next) {
    try {
        await walletService.deleteWallet(req.params.id, req.user);
        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
}

async function getAllWallet(req, res, next) {
    try {
        const result = await walletService.getAllWallet(req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createWallet,
    updateWallet,
    deleteWallet,
    getAllWallet
}