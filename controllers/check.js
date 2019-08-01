const Blogs=require('../models/Blogs');

module.exports.isAuthenticated = (req,res,next) => {
    if(req.session.user){
        next();
    }else{
        return res.redirect('/ieeesb/login');
    }
}

module.exports.isAdmin = (req,res,next) => {
    if(req.session.user && req.session.user.isAdmin ){
        next();
    }else{
        return res.status(404).render('main/error',{
            act:"login",
            user:req.session.user,
            msg:'Unauthorised access'
        });
    }
}

module.exports.isFaculty = (req,res,next) => {
    if(req.session.user && req.session.user.isFaculty ){
        next();
    }else{
        return res.status(404).render('main/error',{
            act:"login",
            user:req.session.user,
            msg:'Unauthorised access'
        });
    }
}

module.exports.isBlogAuthor = (req,res,next) => {
    Blogs.findOne({where:{id:req.params.blogid,userId:req.session.user.id}}).then(results=>{
        if(results){
            next();
        }else{
            return res.status(404).render('main/error',{
                act:"login",
                user:req.session.user,
                msg:'Unauthorised access'
            });
        }
    })
}
