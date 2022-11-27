const { default: mongoose } = require('mongoose');
const { AppObject } = require('../../commons/app.object');
const { BadError } = require('../../libs/errors/base');
const {userRepository} = require('../users/user.repository');
const {walletRepository} = require('../wallets/wallet.repository');

async function createWallet(walletInfo, email) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    walletInfo.user = userFound._id.toString();
    const walletFound = await walletRepository.findOne({user: userFound._id, name: walletInfo.name, status: AppObject.ENUM.STATUS.ACTIVE});
    if(walletFound) {
        throw new BadError('wallet name already exist');
    }
    await walletRepository.create(walletInfo);
}

async function updateWallet(walletInfo, walletId, email) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    const walletFound = await walletRepository.findOne({user: userFound._id, _id: mongoose.Types.ObjectId(walletId), status: AppObject.ENUM.STATUS.ACTIVE});
    if(!walletFound) {
        throw new BadError('wallet not found');
    }
    for(const key of Object.keys(walletInfo)) {
        if(key === "name") {
            const existWallet = await walletRepository.findOne({user: userFound._id, name: walletInfo.name, status: AppObject.ENUM.STATUS.ACTIVE});
            if(existWallet) {
                throw new BadError('wallet name already exist');
            }
        }
        walletFound[key] = walletInfo[key];
    }   
    await walletFound.save();
}

async function deleteWallet(walletId, email) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    const walletFound = await walletRepository.findOne({user: userFound._id, _id: mongoose.Types.ObjectId(walletId), status: AppObject.ENUM.STATUS.ACTIVE});
    if(!walletFound) {
        throw new BadError('wallet not found');
    }
    walletFound.status = AppObject.ENUM.STATUS.DELETED;
    await walletFound.save();
}

async function getAllWallet(email) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    
    const listWallet = await walletRepository.find({user: userFound._id, status: AppObject.ENUM.STATUS.ACTIVE});

    return { data: listWallet}
}

module.exports = {
    createWallet,
    updateWallet,
    deleteWallet,
    getAllWallet
}