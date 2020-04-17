const { Router } = require('express');
const authController = require('./controllers/authController');
const projectController = require('./controllers/projectController');

const authMiddleware = require('../middlewares/auth');

const routes = Router();

// Register
routes.post('/auth/register', authController.register);

// Authenticate
routes.post('/auth/authenticate', authController.authenticate);

// Project
routes.get('/project', authMiddleware, projectController.index);

module.exports = routes;