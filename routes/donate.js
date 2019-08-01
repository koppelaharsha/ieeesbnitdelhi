const express = require('express');
const router = express.Router();
const donatecontroller = require('../controllers/donate');

router.get('/donate',donatecontroller.getdonate);
router.post('/donate',donatecontroller.postdonate);
router.post('/donate/status',donatecontroller.postdonatestatus);
router.get('/donate/status',donatecontroller.getdonatestatus);

module.exports = router;
