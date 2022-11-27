const Joi = require('joi');

const createCategory = Joi.object({
    name: Joi.string().required().pattern(/^[a-zA-Z ]{4,}$/).messages({
        "string.pattern.base": "category name must contain at least 4 characters including letters and space"
    }),
    avatar: Joi.string().optional().allow(null),
})

const updateCategory = Joi.object({
    name: Joi.string().optional().allow(null).pattern(/^[a-zA-Z ]{4,}$/).messages({
        "string.pattern.base": "category name must contain at least 4 characters including letters and space"
    }),
    avatar: Joi.string().optional().allow(null)
})

module.exports = {
    createCategory,
    updateCategory
}
