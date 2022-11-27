const Joi = require('joi');

const createWallet = Joi.object({
    name: Joi.string().required().pattern(/^[a-zA-Z ]{4,}$/).messages({
        "string.pattern.base": "wallet name must contain at least 4 characters including letters and space"
    }),
    currency: Joi.string().valid("USD").required(),
    balance: Joi.number().optional().allow(null)
})

const updateWallet = Joi.object({
    name: Joi.string().optional().allow(null).pattern(/^[a-zA-Z ]{4,}$/).messages({
        "string.pattern.base": "wallet name must contain at least 4 characters including letters and space"
    }),
    currency: Joi.string().optional().allow(null).valid("USD"),
    balance: Joi.number().optional().allow(null)
})

module.exports = {
    createWallet,
    updateWallet
}
