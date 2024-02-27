import Joi from 'joi';

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
})

const getUserValidation = Joi.string().max(100).required();

export {
    loginUserValidation,
    getUserValidation,
}