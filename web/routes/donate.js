const express = require('express');
const router = express.Router();
const donatecontroller = require('../controllers/donate');
const validate = require('../controllers/validate');

router.get('/donate', donatecontroller.getdonate);
router.post('/donate', validate.donate, donatecontroller.postdonate);
router.post('/donate/status', donatecontroller.postdonatestatus);
router.get('/donate/status', donatecontroller.getdonatestatus);

module.exports = router;
