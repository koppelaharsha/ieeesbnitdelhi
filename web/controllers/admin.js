const Events = require('../models/Events');
const fs = require('fs');
const path = require('path');
const { eventIdInc } = require('../../util/keys');

module.exports.getAddEvent = (req,res,next) => {
    return res.render('admin/add_event',{
        act: 'events',
        uact: "add-event",
        csrfToken: req.csrfToken(),
        user: req.session.user
    });
}

module.exports.postAddEvent = (req,res,next) => {
    let etitle = req.body.title.trim();
    let edesc = req.body.description.replace(/\r\n/g,'<br>');
    let estdt = req.body.start_date;
    let eenddt = req.body.end_date;
    let evenue = req.body.venue;
    let elink = etitle.toLowerCase().replace(/\W|_/g,' ').split(/\s+/).join('-');
    Events.create({
        title: etitle,
        description: edesc,
        startDate: estdt,
        endDate: eenddt,
        venue: evenue,
        linktext: elink
    }).then(result => {
        res.redirect('/ieeesb/events');
        const edir = path.join(__dirname,'..','public','gallery',(result.id+eventIdInc).toString());
        return fs.mkdir(edir,(error) => {
            if(error){
                console.log('Unable to create event directory'+edir);
            }
        });
    }).catch(error => {
        console.log(error);
        return next();
    })
}

module.exports.getUpdateEvent = (req,res,next) => {
    let eid = Math.abs(parseInt(req.params.eid))-eventIdInc;
    if(eid === NaN || !eid || eid <= 0 ){
        return next();
    }
    Events.findOne({
        where: { id:eid }
    }).then(results => {
        req.session.eid = results.id;
        let event = results;
        results.startDate = event.startDate.toLocaleString('en-US',{month:"long",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"});
        results.endDate = event.endDate.toLocaleString('en-US',{month:"long",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"});
        return res.render('admin/update_event',{
            act: 'events',
            uact: "update-event",
            user: req.session.user,
            csrfToken: req.csrfToken(),
            event: results
        });
    }).catch(error => {
        console.log(error);
        return next();
    })
}

module.exports.postUpdateEvent = async (req,res,next) => {
    if(req.session.eid != parseInt(req.params.eid)-eventIdInc){ 
        return next(); 
    }
    let etitle = req.body.title.trim();
    console.log((req.body.description).toString());
    let edesc = req.body.description.replace(/\r\n/g,'<br>');
    let estdt = req.body.start_date;
    let eenddt = req.body.end_date;
    let evenue = req.body.venue;
    let elink = etitle.toLowerCase().replace(/\W|_/g,' ').split(/\s+/).join('-');
    let event = await Events.findOne({
        where:{id:req.session.eid}
    });
    if(!event){
        return next();
    }
    event.title = etitle;
    event.description = edesc;
    event.startDate = estdt;
    event.endDate = eenddt;
    event.venue = evenue;
    event.linktext = elink;
    event.save();
    return res.redirect('/ieeesb/events');
}

module.exports.postDeleteEvent = (req,res,next) => {
    let preid = parseInt(req.params.eid) || '';
    let pseid = parseInt(req.body.eid) || '';
    if( isNaN(preid) || preid != pseid){
        return next();
    }
    if(parseInt(req.body.verified) != 1){
        return next();
    }
    let eid = preid - eventIdInc;
    Events.destroy({
        where: {id: eid}
    }).then( results => {
        if(results == 1){
            res.redirect('/ieeesb/events');
        }
        return next();
    }).catch( error => {
        console.log(error);
        return next();
    });
}
