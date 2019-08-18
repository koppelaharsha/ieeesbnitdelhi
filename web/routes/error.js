const express = require('express');
const router = express.Router();
const errorController = require('../controllers/error');

router.use('/',errorController.error404);
router.use('/',errorController.errorHandler);

module.exports = router;
