const Joi = require('joi');

const createTransaction = Joi.object({
    category: Joi.string().required().pattern(new RegExp('^[a-f0-9]{24,24}')).messages({
        "string.pattern.base": "category required valid uuid"
    }),
    ammout: Joi.number().min(0).required(),
    type: Joi.string().required().valid("transfer", "receive"),
    note: Joi.string().required().allow(""),
    date: Joi.date().required(),
    wallet: Joi.string().required().pattern(new RegExp('^[a-f0-9]{24,24}')).messages({
        "string.pattern.base": "wallet required valid uuid"
    }),
    avatar: Joi.string().optional().allow(null)
})

module.exports = {
    createTransaction
}
