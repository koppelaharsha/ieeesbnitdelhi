const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-event', adminController.getAddEvent);
router.post('/add-event', adminController.postAddEvent);
router.get('/update-event/:eid', adminController.getUpdateEvent);
router.post('/update-event/:eid', adminController.postUpdateEvent);
router.post('/delete-event/:eid', adminController.postDeleteEvent);

module.exports = router;
