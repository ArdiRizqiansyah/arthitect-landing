import Joi from 'joi';

const createProjectValidation = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(100).required(),
    image: Joi.string().max(100).optional(),
});

const updateProjectValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    name: Joi.string().max(100).optional(),
    description: Joi.string().max(100).optional(),
    image: Joi.string().max(100).optional(),
});

const getProjectValidation = Joi.number().min(1).positive().required();

export {
    createProjectValidation,
    updateProjectValidation,
    getProjectValidation,
}