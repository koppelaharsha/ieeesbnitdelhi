const express = require('express');
const router = express.Router();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
// const facultyRoutes = require('./faculty');
const userRoutes = require('./routes/user');
const mainRoutes = require('./routes/main');
const errorRoutes = require('./routes/error');
const donateRoutes = require('./routes/donate');

const check = require('./controllers/check');

router.get('/hello', (req,res) => {res.send('Hello')} );

router.use( authRoutes );
router.use('/admin', check.isAdmin, adminRoutes );
router.use('/u', check.isAuthenticated, userRoutes );
// router.use('/f', check.isFaculty, facultyRoutes );

router.use( mainRoutes );
router.use( donateRoutes );
router.use( errorRoutes );

module.exports = router;
