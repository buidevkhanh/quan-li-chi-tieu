const { userRepository } = require('../users/user.repository');
const { transactionRepository } = require('../transactions/transaction.repository');
const { walletRepository} = require('../wallets/wallet.repository');
const { categoryRepository} = require('../categories/category.repository');
const { BadError } = require('../../libs/errors/base');
const { default: mongoose } = require('mongoose');
const { AppObject } = require('../../commons/app.object');

async function createTransaction(email, transaction) {
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    const walletFound = await walletRepository.findOne({user: userFound._id, wallet: mongoose.Types.ObjectId(transaction.wallet), status: AppObject.ENUM.STATUS.ACTIVE});
    if(!walletFound) {
        throw new BadError('wallet not found');
    }
    const categoryFound = await categoryRepository.findOne({user: userFound._id, category: mongoose.Types.ObjectId(transaction.category), status: AppObject.ENUM.STATUS.ACTIVE});
    if(!categoryFound) {
        throw new BadError('category not found');
    }
    transaction.user = userFound._id.toString();
    const date = new Date(transaction.date);
    delete transaction.date;
    transaction.day = date.getDate();
    transaction.month = date.getMonth() + 1;
    transaction.year = date.getFullYear();
    await transactionRepository.create(transaction);
    transaction.type === 'transfer' ? 
    walletFound.balance = walletFound.balance - transaction.ammout : 
    walletFound.balance = walletFound.balance + transaction.ammout;
    await walletFound.save();
}

async function getTransaction(email, params) {
    const { wallet } = params;
    const userFound = await userRepository.findOne({email});
    if(!userFound) {
        throw new BadError('user not found');
    }
    const conditions = {};
    if(wallet) {
        const walletFound = await walletRepository.findOne({user: userFound._id, _id: mongoose.Types.ObjectId(wallet), status: AppObject.ENUM.STATUS.ACTIVE});
        if(!walletFound) {
            throw new BadError('wallet not found');
        }
        conditions.wallet = wallet;
    }
    return transactionRepository.find({user: userFound._id, conditions}).lean();
}

async function statistic(email, params) {
    const userFound = await userRepository.findOne({email});
    const type = params.type || 'USD';
    if(!userFound) {
        throw new BadError('user not found');
    }
    const transfer = await transactionRepository.find({user: userFound._id, type: 'transfer'}).lean();
    const receive = await transactionRepository.find({user: userFound._id, type: 'receive'}).lean();

    const today = new Date();
    let thisDay = today.getDay();
    if(thisDay == 0) thisDay = 7;
    const begin_week = new Date(today.setDate(today.getDate() - (thisDay - 1)));

    const all_transfer = transfer.reduce((total, item) => {
        total.all_transfer += item.ammout;
        if(item.year === new Date().getFullYear())
            total.month_of_year_transfer[item.month - 1] += item.ammout;
        const delta = Number(new Date(`${item.year}-${item.month}-${item.day}`)) - Number(begin_week);
        if(delta >= 0 && delta < 604800000) {
            total.day_of_week_transfer[new Date(`${item.year}-${item.month}-${item.day}`).getDay()] += item.ammout;
        }
        return {
            ...total
        }
    }, { all_transfer: 0, month_of_year_transfer: [0,0,0,0,0,0,0,0,0,0,0,0], day_of_week_transfer: [0,0,0,0,0,0,0]});

    const all_receive = receive.reduce((total, item) => {
        total.all_receive  += item.ammout;
        if(item.year === new Date().getFullYear())
            total.month_of_year_receive[item.month-1] += item.ammout;
        const delta = Number(new Date(`${item.year}-${item.month}-${item.day}`)) - Number(begin_week);
        if(delta >= 0 && delta < 604800000) {
            total.day_of_week_receive[new Date(`${item.year}-${item.month}-${item.day}`).getDay()] += item.ammout;
        }
        return {
            ...total
        }
    }, { all_receive: 0, month_of_year_receive: [0,0,0,0,0,0,0,0,0,0,0,0], day_of_week_receive: [0,0,0,0,0,0,0]});


    return {
       ...all_transfer,
       ...all_receive
    }
}

module.exports = {
    createTransaction,
    getTransaction,
    statistic
}