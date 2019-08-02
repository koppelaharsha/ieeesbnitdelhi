// const Blogs = require('../models/Blogs');
// const Users = require('../models/Users');

// module.exports.blogs = (req, res, next) => {
//     let page = parseInt(req.params.page);
//     if (page === NaN || !page || page <= 0) {
//         return next();
//     }
//     let blogs = [];
//     let bc = 6;
//     Blogs.findAndCountAll({
//         where: {userId: req.session.user.id},
//         include: [{model: Users,attributes: ['username', 'name']}],
//         order: [['updatedAt', 'DESC']],
//         offset: (page - 1) * bc,
//         limit: bc
//     }).then(results => {
//         blogs = results.rows;
//         last = Math.ceil(results.count / bc);
//         return res.render('faculty/blogs', {
//             act: "blogs",
//             user: req.session.user,
//             blogs: blogs,
//             last: last,
//             page: page
//         })
//     }).catch(error => {
//         console.log(error);
//         return next();
//     });
// }

// module.exports.getAddBlog = (req, res, next) => {
//     return res.render('faculty/add_blog', {
//         act: 'blogs',
//         uact: "add-blog",
//         csrfToken: req.csrfToken(),
//         user: req.session.user
//     });
// }

// module.exports.postAddBlog = (req, res, next) => {
//     let bauthor = req.session.user.id;
//     let btitle = req.body.title.replace(/\s+/g, ' ').trim();
//     let bcontent = req.body.content.trim().replace(/\r\n/g, '<br>');
//     Blogs.create({
//         userId: bauthor,
//         title: btitle,
//         content: bcontent
//     }).then(result => {
//         res.redirect('/ieeesb/blogs');
//     }).catch(error => {
//         console.log(error);
//         return next();
//     })
// }

// module.exports.getEditBlog = (req, res, next) => {
//     let bid = req.params.blogid;
//     Blogs.findOne({
//         where: {id: bid}
//     }).then(results => {
//         req.session.bid = results.id;
//         return res.render('faculty/edit_blog', {
//             act: 'blogs',
//             uact: "edit-blog",
//             user: req.session.user,
//             csrfToken: req.csrfToken(),
//             blog: results
//         })
//     }).catch((error => {
//         console.log(error);
//         return next();
//     }))
// }

// module.exports.postEditBlog = async (req, res, next) => {
//     if(req.session.bid != req.params.blogid){
//         return next();
//     }
//     let btitle = req.body.title.replace(/\s+/g, ' ').trim();
//     let bcontent = req.body.content.trim().replace(/\r\n/g, '<br>');
//     let blog = await Blogs.findOne({
//         where: {id: req.session.bid}
//     }).catch(err => {
//         return next();
//     });
//     if(!blog){
//         return next();
//     }
//     blog.title = btitle;
//     blog.content = bcontent;
//     blog.save();
//     return res.redirect('/ieeesb/f/my-blogs');
// }
