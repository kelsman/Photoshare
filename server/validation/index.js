const Joi = require('joi');

module.exports = authSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(5).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(3)
});




