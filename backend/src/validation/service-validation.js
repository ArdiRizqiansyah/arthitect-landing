import Joi from 'joi';

const createServiceValidation = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(100).required(),
    icon: Joi.string().max(100).required(),
});

const updateServiceValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    name: Joi.string().max(100).required(),
    description: Joi.string().max(100).required(),
    icon: Joi.string().max(100).required(),
});

const getServiceValidation = Joi.number().min(1).positive().required();

export {
    createServiceValidation,
    updateServiceValidation,
    getServiceValidation,
}