const Users = require('../models/Users');
const Blogs = require('../models/Blogs');
const Events = require('../models/Events');
const Sequelize = require('sequelize');
const sop = Sequelize.Op;
const mailer = require('../util/mailer');
const fs = require('fs');
const path = require('path');
const {eventIdInc, myMailId} = require('../data/keys');

module.exports.profile = (req,res,next) => {
    Users.findOne({
        where: {username:req.params.username},
        attributes: ['id','name','username','email'] 
    }).then(results => {
        if(results){
            return res.render('main/profile',{
                act: "login",
                user: req.session.user,
                cuser: results
            })
        }else{
            return next();
        }
    }).catch(error => {
        return console.log(error);
    });
}

module.exports.home = (req,res,next) => {
    return res.render('main/home',{
        act: "home",
        user: req.session.user
    });
}

module.exports.events = (req,res,next) => {
    let oe = [];
    let ue = [];
    Events.findAll({ 
        where: {
            startDate: {[sop.lt]:new Date()}, 
            endDate: {[sop.gt]:new Date()} 
        }, order: [
            ['endDate','ASC'],
            ['startDate','DESC']
        ]
    }).then(results => {
        oe = results;
        Events.findAll({ 
            where: { startDate:{[sop.gt]:new Date()} }, 
            order: [['startDate','ASC'],['endDate','ASC']] 
        }).then(results => {
            ue = results; 
            return res.render('main/events',{
                act: "events",
                user: req.session.user,
                uce: ue,
                oge: oe
            });
        })
    }).catch(error => {
        console.log(error);
        return next();
    });
}

module.exports.pastevents = (req,res,next) => {
    let page = parseInt(req.params.page) || 0;
    if(page === NaN || !page || page <= 0){ 
        return next(); 
    }
    let pe = [];
    let pc = 6;
    Events.findAndCountAll({ 
        where: { endDate:{ [sop.lt] : new Date() } }, 
        order: [['endDate','DESC'],['startDate','DESC']], 
        offset: (page-1)*pc, 
        limit: pc 
    }).then(results => {
        pe = results.rows;
        last = Math.ceil(results.count/pc);
        return res.render('main/events_past',{
            act: "events",
            user: req.session.user,
            pe: pe,
            last: last,
            page: page
        })
    }).catch(error => {
        console.log(error);
        next();
    })
}

module.exports.event = (req,res,next) => {
    let eid = parseInt(req.params.eid)-eventIdInc || 0;
    if(eid <= 0){
        return next();
    }
    let elink = req.params.elink || '';
    // console.log(elink);
    Events.findOne({ 
        where: { id:eid } 
    }).then(results => {
        if(results){
            if(results.linktext!=elink){
                return res.redirect('/ieeesb/event/'+(parseInt(results.id)+eventIdInc)+'/'+results.linktext);
            }
            const event = results;
            const edir = path.join(__dirname,'..','public','gallery',(event.id+eventIdInc).toString());
            let images = [];
            fs.readdir(edir,(error,files) => {
                if(files){
                    images = files;
                }
                return res.render('main/event',{
                    act: 'events',
                    user: req.session.user,
                    event: event,
                    images: images
                })
            });
        }else{
            return next();
        }
    }).catch(error => {
        console.log(error);
        return next();
    })
}

module.exports.allblogs = (req,res,next) => {
    let page = parseInt(req.params.page);
    if(page === NaN || !page || page<=0){ 
        return next(); 
    }
    let blogs = [];
    let bc = 6;
    //let last=0;
    Blogs.findAndCountAll({ 
        include: [{model:Users,attributes:['username','name']}], 
        order: [['updatedAt','DESC']], 
        offset: (page-1)*bc, 
        limit: bc 
    }).then(results => {
        blogs = results.rows;
        last = Math.ceil(results.count/bc);
        return res.render('main/blogs',{
            act: "blogs",
            user: req.session.user,
            blogs: blogs,
            last: last,
            page: page
        })
    }).catch(error=>{
        console.log(error);
        return next();
    });
}

module.exports.aboutus = (req,res,next) => {
    let data = require('../data/members');
    return res.render('main/about_us',{
        act: "aboutus",
        user: req.session.user,
        data: data
    });
}

module.exports.getContactUs = (req,res,next) => {
    let msg = req.flash('msg')[0];
    return res.render('main/contact_us',{
        act: "contactus",
        user: req.session.user,
        csrfToken: req.csrfToken(),
        msg: msg
    });
}

module.exports.postContactUs = (req,res,next) => {
    let name = req.body.name.toString().replace(/\s+/g, ' ').trim();
    let email = req.body.email.toString().replace(/\s+/g, '').trim();
    let feedback = req.body.feedback.toString().trim();
    req.flash('msg','Thank you for contacting us!');
    res.redirect('/ieeesb/contact_us');
    return mailer.sendMail({
        from: myMailId,
        to: myMailId,
        cc: 'khvr765@gmail.com',
        auth: {
            user: myMailId
        },
        subject: 'IEEE-NITD Feedback/Suggestion',
        html: 'From: <strong>'+name+'('+email+')</strong>'+'\
            <p>'+feedback+'</p>'
    },(error,info) => {
        if(error){
            console.log(error);
        }
    });
}

module.exports.error = (req,res,next) => {
    return res.status(404).render('main/error',{
        act: "none",
        user: req.session.user,
        msg: 'Page Not Found'
    });
}
