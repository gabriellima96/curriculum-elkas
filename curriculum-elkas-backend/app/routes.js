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
// router.use(authMiddleware);

/**
 * Users
 */
router.put('/users', authMiddleware, controllers.userController.update);
router.get('/users/informations', authMiddleware, controllers.userController.index);

/**
 * CURRICULUM
 */
// route.get('/:id/informations', controllers.userController.index);

/**
 * Rota não encontrada
 */
router.use((req, res) => res.status(404).json({ error: 'Router not found' }));

/**
 * Middleware de errors
 */
router.use((error, req, res, _next) => {
  res.status(error.status || 500);

  return res.json({ error: error.message });
});

module.exports = router;
