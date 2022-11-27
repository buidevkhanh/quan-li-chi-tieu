const {mongoose} = require('../../configs/database.cf');
const { AppObject } = require("../../commons/app.object");

const TransactionSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: AppObject.COLLECTION.USERS},
    category: { type: mongoose.Types.ObjectId, ref: AppObject.COLLECTION.CATEGORIES},
    ammout: { type: Number, default: 0},
    type: { type: String, enum: ["transfer", "receive"]},
    note: { type: String, required: false},
    day: { type: Number, required: true},
    month: { type: Number, required: true},
    year: { type: Number, required: true},
    wallet: { type: mongoose.Types.ObjectId, ref: AppObject.COLLECTION.WALLETS},
    photos: [{ type: String }]
}, { timestamps: true})

const transactionModel = mongoose.model(AppObject.COLLECTION.TRANSACTIONS, TransactionSchema);

module.exports = { transactionModel }
 
