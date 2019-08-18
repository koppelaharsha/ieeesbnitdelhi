const Users=require('../models/Users');
const bcrypt=require('bcryptjs');

module.exports.profile = (req,res,next) => {
    return res.render('user/profile',{
        act: "login",
        uact: "view-profile",
        user: req.session.user,
        msg: null
    });
}

module.exports.settings = (req,res,next) => {
    return res.render('user/settings',{
        act: 'login',
        uact: "settings",
        user: req.session.user,
        msg: null
    });
}

module.exports.getupdateprofile = (req,res,next) => {
    return res.render('user/update_profile',{
        act: 'login',
        uact: "update-profile",
        user: req.session.user,
        csrfToken: req.csrfToken(),
        msg: req.flash('msg')
    })
}

module.exports.postupdateprofile = async (req,res,next) => {
    let nname = req.body.name.replace(/\s+/g, ' ').trim();
    let nemail = req.body.email.replace(/\s+/g, '');
    let nusername = req.body.username.replace(/\s+/g, '');
    let msg = '', res1 = null, res2 = null;
    let user=await Users.findOne({
        where:{id:req.session.user.id}
    });
    if(!user){
        return next();
    }
    if(nname != req.session.user.name){
        user.name = nname;
        user.save();
    }
    if(nusername != req.session.user.username){
        await Users.findOne({
            where: {username:nusername}
        }).then(res1 => {
            if(res1){
                msg += 'Username already exists';
            }else{
                user.username = nusername;
                user.save();
            }
        })
    }
    if(nemail != req.session.user.email){
        await Users.findOne({
            where: {email:nemail}
        }).then(res2 => {
            if(res2){
                msg += 'Email already exists';
            }else{
                user.email = nemail;
                user.save();
            }
        })
    }
    user.reload();
    req.session.user = user;
    if(res1 || res2){
        req.flash('msg',msg);
        return res.redirect('/ieeesb/u/update-profile')
    }else{
        return res.redirect('/ieeesb/u/profile');
    }
}

module.exports.getupdatepassword = (req,res,next) => {
    return res.render('user/update_password',{
        act: 'login',
        uact: "update-password",
        user: req.session.user,
        csrfToken: req.csrfToken(),
        msg: req.flash('msg')
    })
}

module.exports.postupdatepassword = (req,res,next) => {
    let opwd = req.body.current_password;
    let npwd = req.body.new_password;
    let cpwd = req.body.confirm_password;
    if(bcrypt.compareSync(opwd,req.session.user.password)){
        if(npwd !== cpwd){
            let msg = "Passwords didn't match";
            req.flash('msg',msg);
            return res.redirect('/ieeesb/u/update-password');
        }
        Users.update(
            {password: bcrypt.hashSync(npwd,8)},
            {where: {id:req.session.user.id}}
        ).then(user => {
            req.session.user = user;
            let msg = 'Password Updated Successfully';
            req.flash('msg',msg);
            return res.redirect('/ieeesb/u/settings');
        }).catch(error => {
            console.log(error);
            return next();
        })
    }
    let msg = 'Incorrect current password';
    req.flash('msg',msg);
    return res.redirect('/ieeesb/u/update-password');
}
