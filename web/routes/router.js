const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const adminRoutes = require('./admin');
// const facultyRoutes = require('./faculty');
const userRoutes = require('./user');
const mainRoutes = require('./main');
const errorRoutes = require('./error');
const donateRoutes = require('./donate');

router.get('/hello', (req,res) => {res.send('Hello')} );
router.use( authRoutes );
router.use('/admin', adminRoutes );
// router.use('/f', facultyRoutes );
router.use('/u', userRoutes );
router.use( mainRoutes );
router.use( donateRoutes );
router.use( errorRoutes );

module.exports = router;
