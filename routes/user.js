const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const check = require('../controllers/check');

router.get('/',check.isAuthenticated, userController.profile);
router.get('/profile',check.isAuthenticated, userController.profile);
router.get('/settings',check.isAuthenticated, userController.settings);
router.get('/update-profile',check.isAuthenticated, userController.getupdateprofile);
router.post('/update-profile',check.isAuthenticated, userController.postupdateprofile);
router.get('/update-password',check.isAuthenticated, userController.getupdatepassword);
router.post('/update-password',check.isAuthenticated, userController.postupdatepassword);

module.exports = router;
