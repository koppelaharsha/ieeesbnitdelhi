const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const validate = require('../controllers/validate');

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', validate.login, authController.postLogin);
router.get('/logout', authController.getLogout);

module.exports = router;
