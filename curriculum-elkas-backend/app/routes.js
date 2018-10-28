const express = require('express');
const requireDir = require('require-dir');

const router = express.Router();

const controllers = requireDir('./controllers');
const authMiddleware = require('./middlewares/auth');

/**
 * CREATE USER
 */
router.post('/signup', controllers.authController.signup);

/**
 * AUTH USER
 */
router.post('/signin', controllers.authController.signin);

/**
 * AUTH ROUTERS
 */
router.use(authMiddleware);

/**
 * Users
 */
router.put('/users', controllers.userController.update);

/**
 * CURRICULUM
 */
// route.get('/:id/informations', controllers.userController.index);

module.exports = router;
