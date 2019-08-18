
module.exports.error404 = (req,res,next) => {
    return res.status(404).render('error/error',{
        act: "none",
        user: req.session.user,
        msg: 'Page Not Found'
    });
}

module.exports.errorHandler = (err,req,res,next) => {
    return res.status(404).render('error/error',{
        act: "none",
        user: req.session.user,
        msg: 'Page Not Found'
    });
}
