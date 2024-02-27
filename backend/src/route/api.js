import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import serviceController from '../controller/service-controller.js';
import fileUpload from 'express-fileupload';
import projectController from '../controller/project-controller.js';
import testimonialController from '../controller/testimonial-controller.js';
import dashboardController from '../controller/dashboard-controller.js';

const userRouter = express.Router();
userRouter.use(authMiddleware);
userRouter.use(fileUpload());

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.delete('/api/users/logout', userController.logout);

// Dashboard Api
userRouter.get('/api/users/dashboard', dashboardController.index);

// Service API
userRouter.post('/api/users/services', serviceController.create);
userRouter.put('/api/users/services/:serviceId', serviceController.update);
userRouter.get('/api/users/services/:serviceId', serviceController.get);
userRouter.delete('/api/users/services/:serviceId', serviceController.remove);

// Project API
userRouter.post('/api/users/projects', projectController.create);
userRouter.put('/api/users/projects/:projectId', projectController.update);
userRouter.get('/api/users/projects/:projectId', projectController.get);
userRouter.delete('/api/users/projects/:projectId', projectController.remove);

// Testimonial API
userRouter.post('/api/users/testimonials', testimonialController.create);
userRouter.put('/api/users/testimonials/:testimonialId', testimonialController.update);
userRouter.get('/api/users/testimonials/:testimonialId', testimonialController.get);
userRouter.delete('/api/users/testimonials/:testimonialId', testimonialController.remove);

export {
    userRouter
}