const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const validate = require('../controllers/validate');

router.get('/',mainController.home);
router.get('/home',mainController.home);
router.get('/events',mainController.events);
router.get('/events/past',(req,res,next)=>{return res.redirect('/ieeesb/events/past/1')});
router.get('/events/past/:page',mainController.pastevents);
router.get('/event/:eid',mainController.event);
router.get('/event/:eid/(:elink)?',mainController.event);
// router.get('/blogs',(req,res,next)=>{return res.redirect('/ieeesb/blogs/1')});
// router.get('/blogs/:page',mainController.allblogs);
router.get('/about_us',mainController.aboutus);
router.get('/contact_us',mainController.getContactUs);
router.post('/contact_us',validate.contactus, mainController.postContactUs);
router.get('/user/:username',mainController.profile);

module.exports = router;
