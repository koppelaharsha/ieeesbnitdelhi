const Sequelize = require('sequelize');
const sop = Sequelize.Op;
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const mailer = require('../../util/mailer');
const { mailCredentials } = require('../data/keys');

module.exports.getSignup = (req, res, next) => {
    return next();
    if (!req.session.user){
        msg = console.log(req.flash('msg')[0]);
        return res.render('auth/signup', {
            act: "login",
            msg: msg,
            csrfToken: req.csrfToken(),
            user: req.session.user,
        });
    } else {
        return res.redirect('/ieeesb/u/profile');
    }
}

module.exports.postSignup = (req, res, next) => {
    return next();
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    let msg = '';
    Users.findOne({
        where: {username: username}
    }).then(results1 => {
        if(results1){
            msg += 'Username already exists ';
        }
        Users.findOne({
            where: {email: email}
        }).then(results2 => {
            if(results2){
                msg += 'Email already exists ';
            }
            if(results1 || results2){
                req.flash('msg', msg);
                return res.redirect('/ieeesb/signup');
            }else{
                Users.create({
                    username: username,
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(password, 8)
                }).then(results => {
                    req.flash('msg', 'Signup successful. Please login with your credentials')
                    res.redirect('/ieeesb/login');
                    return mailer.sendMail({
                        auth: {
                            user: mailCredentials.mailId,
                        },
                        from: 'IEEESB NIT-Delhi <' + mailCredentials.mailId + '>',
                        to: results.email,
                        subject: 'IEEE-NITD Account Activation',
                        html: '<h3>Thank you for Signing Up.</h3>'
                    });
                });
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

module.exports.getLogin = (req, res, next) => {
    if(!req.session.user){
        msg = req.flash('msg')[0];
        return res.render('auth/login', {
            act: "login",
            csrfToken: req.csrfToken(),
            msg: msg,
            user: req.session.user,
        });
    }else{
        return res.redirect('/ieeesb/u/profile');
    }
}

module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email != 'admin') return res.redirect('/ieeesb/login');
    Users.findOne({
        where: {[sop.or]: [{email: email}, {username: email}]}
    }).then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.user = user;
        }else{
            req.flash('msg', 'Invalid credentials');
        }
        return res.redirect('/ieeesb/login');
    }).catch(err => {
        console.log(err);
        return next();
    })
}

module.exports.getLogout = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/ieeesb/login');
    }else{
        if(delete req.session.user){
            req.flash('msg', 'You have successfully Logged Out');
            return res.redirect('/ieeesb/login');
        }else{
            console.log(err);
            return res.redirect('/ieeesb/login');
        }
    }
}
