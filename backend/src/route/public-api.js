import express from 'express';
import userController from '../controller/user-controller.js';
import serviceController from '../controller/service-controller.js';
import projectController from '../controller/project-controller.js';
import testimonialController from '../controller/testimonial-controller.js';

const publicRouter = express.Router();

publicRouter.post('/api/users/login', userController.login);
publicRouter.post('/api/users/make-admin', userController.makeAdmin);

publicRouter.get('/api/users/services', serviceController.list);
publicRouter.get('/api/users/projects', projectController.list);
publicRouter.get('/api/users/testimonials', testimonialController.list);

export {
    publicRouter
}