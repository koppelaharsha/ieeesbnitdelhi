const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const check = require('../controllers/check');

router.get('/add-event',check.isAdmin, adminController.getAddEvent);
router.post('/add-event',check.isAdmin, adminController.postAddEvent);
router.get('/update-event/:eid',check.isAdmin, adminController.getUpdateEvent);
router.post('/update-event/:eid',check.isAdmin, adminController.postUpdateEvent);
router.post('/delete-event/:eid',check.isAdmin, adminController.postDeleteEvent);

module.exports = router;
