import Joi from 'joi';

const createTestimonialValidation = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(100).required(),
    image: Joi.string().max(100).optional(),
});

const updateTestimonialValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    name: Joi.string().max(100).optional(),
    description: Joi.string().max(100).optional(),
    image: Joi.string().max(100).optional(),
});

const getTestimonialValidation = Joi.number().min(1).positive().required();

export {
    createTestimonialValidation,
    updateTestimonialValidation,
    getTestimonialValidation,
}