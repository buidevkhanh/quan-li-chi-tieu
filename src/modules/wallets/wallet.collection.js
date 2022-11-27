const {mongoose} = require('../../configs/database.cf');
const { AppObject } = require("../../commons/app.object");

const WalletSchema = mongoose.Schema({
    name: { type: String, required: true},
    user: { type: mongoose.Types.ObjectId, ref: AppObject.COLLECTION.USERS},
    currency: { type: String, enum: ["USD"], default: "USD"},
    balance: { type: Number, default: 0 },
    status: {type: String, enum: Object.values(AppObject.ENUM.STATUS), default: AppObject.ENUM.STATUS.ACTIVE}
}, { timestamps: true})

const walletModel = mongoose.model(AppObject.COLLECTION.WALLETS, WalletSchema);

module.exports = { walletModel }
 
