const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const adminRoutes = require('./admin');
// const facultyRoutes = require('./faculty');
const userRoutes = require('./user');
const mainRoutes = require('./main');
const errorRoutes = require('./error');
const donateRoutes = require('./donate');

const check = require('../controllers/check');

router.get('/hello', (req,res) => {res.send('Hello')} );
router.use( authRoutes );
router.use('/admin', check.isAdmin, adminRoutes );
// router.use('/f', check.isFaculty, facultyRoutes );
router.use('/u', check.isAuthenticated, userRoutes );
router.use( mainRoutes );
router.use( donateRoutes );
router.use( errorRoutes );

module.exports = router;
