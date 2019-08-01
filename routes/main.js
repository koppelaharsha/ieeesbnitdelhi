const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');

router.get('/',controller.home);
router.get('/home',controller.home);
router.get('/events',controller.events);
router.get('/events/past',(req,res,next)=>{return res.redirect('/ieeesb/events/past/1')});
router.get('/events/past/:page',controller.pastevents);
router.get('/event/:eid',controller.event);
router.get('/event/:eid/(:elink)?',controller.event);
router.get('/blogs',(req,res,next)=>{return res.redirect('/ieeesb/blogs/1')});
router.get('/blogs/:page',controller.allblogs);
router.get('/about_us',controller.aboutus);
router.get('/contact_us',controller.getContactUs);
router.post('/contact_us',controller.postContactUs);
router.get('/user/:username',controller.profile);
router.use('/',controller.error);

module.exports = router;
