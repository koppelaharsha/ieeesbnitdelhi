const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.profile);
router.get('/profile', userController.profile);
router.get('/settings', userController.settings);
router.get('/update-profile', userController.getupdateprofile);
router.post('/update-profile', userController.postupdateprofile);
router.get('/update-password', userController.getupdatepassword);
router.post('/update-password', userController.postupdatepassword);

module.exports = router;
