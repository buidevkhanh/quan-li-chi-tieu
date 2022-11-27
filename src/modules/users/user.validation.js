const Joi = require('joi');

const userReg = Joi.object({
    fullname: Joi.string().required().pattern(/^[a-zA-Z ]{3,}$/).messages({
        "string.pattern.base": "fullname must contain at least 3 characters including letters and space"
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9\\@\\$\\!\\%\\*\\#\\?\\&]{8,}/).messages({
        "string.pattern.base": "password must contain at least 8 characters including letters, numbers and special characters"
    })
});

const userLog = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9\\@\\$\\!\\%\\*\\#\\?\\&]{8,}/).messages({
        "string.pattern.base": "password must contain at least 8 characters including letters, numbers and special characters"
    })
});

const userUpdateInfo = Joi.object({
    fullname: Joi.string().optional().allow(null).pattern(/^[a-zA-Z ]{3,}$/).messages({
        "string.pattern.base": "fullname must contain at least 3 characters including letters and space"
    }),
    email: Joi.string().email().optional().allow(null),
    password: Joi.string().optional().allow(null).pattern(/^[a-zA-Z0-9\\@\\$\\!\\%\\*\\#\\?\\&]{8,}/).messages({
        "string.pattern.base": "password must contain at least 8 characters including letters, numbers and special characters"
    }),
    avatar: Joi.string().optional().allow(null)
})

module.exports = {
    userReg,
    userLog,
    userUpdateInfo
}