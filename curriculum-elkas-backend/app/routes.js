const express = require('express');
const requireDir = require('require-dir');

const router = express.Router();

const controllers = requireDir('./controllers');
const authMiddleware = require('./middlewares/auth');

/**
 * Users
 */
router.post('/users', controllers.authController.signup);

/**
 * Users Auth
 */
router.post('/users/signin', controllers.authController.signin);
router.put('/users/:username', authMiddleware, controllers.userController.update);
router.get('/users/:username', authMiddleware, controllers.userController.index);

/**
 * CURRICULUM
 */
router.post('/curriculums', authMiddleware, controllers.curriculumController.store);
router.put('/curriculums/:id', authMiddleware, controllers.curriculumController.update);
router.delete('/curriculums/:id', authMiddleware, controllers.curriculumController.destroy);
router.get('/curriculums', authMiddleware, controllers.curriculumController.index);
/** ABERTO */
router.get('/curriculums/:id', controllers.curriculumController.show);

/**
 * Rota não encontrada
 */
router.use((req, res) => res.status(404).json({ error: 'Router not found' }));

/**
 * Middleware de errors
 */
router.use((error, req, res, _next) => {
  let messageInfo = error.message;
  let statusInfo = error.status || 500;

  if (error.name === 'ValidationError') {
    statusInfo = 405;
    const parts = error.message.split('`');
    messageInfo = `O campo ${parts[1]} é obrigatório`;
  }

  return res.status(statusInfo).json({ status: statusInfo, error: messageInfo });
});

module.exports = router;
