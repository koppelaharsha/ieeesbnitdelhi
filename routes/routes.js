const express = require('express');
const router = express.Router();

const authRoutes=require('./auth');
const userRoutes=require('./user');
// const facultyRoutes=require('./faculty');
const adminRoutes=require('./admin');
const mainRoutes=require('./main');
const donateRoutes=require('./donate');

router.get('/hello',(req,res)=>{res.send('Hello')});
router.use(authRoutes);
router.use('/u',userRoutes);
// router.use('/f',facultyRoutes);
router.use('/admin',adminRoutes);
router.use(donateRoutes);
router.use(mainRoutes);

module.exports = router;
