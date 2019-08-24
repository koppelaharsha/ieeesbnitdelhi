const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty');
const check = require('../controllers/check');

// router.get('/my-blogs',(req,res,next)=>{ return res.redirect('/ieeesb/f/my-blogs/1'); });
// router.get('/my-blogs/:page', facultyController.blogs);
// router.get('/add-blog', facultyController.getAddBlog);
// router.post('/add-blog', facultyController.postAddBlog);
// router.get('/edit-blog/:blogid', check.isBlogAuthor, facultyController.getEditBlog);
// router.post('/edit-blog/:blogid', check.isBlogAuthor, facultyController.postEditBlog);

module.exports = router;
