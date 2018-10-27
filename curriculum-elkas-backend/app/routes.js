const express = require('express');
const requireDir = require('require-dir');

const router = express.Router();

const controllers = requireDir('./controllers');

router.post('/signup', controllers.authController.signup);

module.exports = router;
