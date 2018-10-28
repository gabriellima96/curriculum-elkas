const express = require('express');
const requireDir = require('require-dir');

const router = express.Router();

const controllers = requireDir('./controllers');

/**
 * CREATE USER
 */
router.post('/signup', controllers.authController.signup);

/**
 * AUTH USER
 */
router.post('/signin', controllers.authController.signin);

/**
 * CURRICULUM
 */
// route.get('/:id/informations', controllers.userController.index);

router.get('/test', (req, res) => res.send('CI success 1'));

module.exports = router;
