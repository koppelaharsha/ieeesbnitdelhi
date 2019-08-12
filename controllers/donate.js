const Payments = require('../models/Payments');
const paytm = require('../util/payments/checksum');
const {hostname,paytmCredentials,mailCredentials} = require('../data/keys');
const mailer = require('../util/mailer');

module.exports.getdonate = (req,res,next) => {
    return res.render('donate/get',{
        act: '',
        user: req.session.user,
        csrfToken: req.csrfToken(),
        msg: null
    });
}

module.exports.postdonate = (req,res,next) => {
    const datetime = new Date();
    const date = datetime.toISOString().split('T')[0].split('-').join('');
    const time = datetime.toISOString().split(/T|\./)[1].split(':').join('');
    const rand = Math.floor(Math.random()*100000000000).toString();
    const orderID = date+time+rand;
    var params 	= [];
	params['MID'] 				= paytmCredentials.mid;
	params['WEBSITE']			= paytmCredentials.website;
	params['CHANNEL_ID']		= 'WEB';
	params['INDUSTRY_TYPE_ID']	= 'Retail';
	params['ORDER_ID']			= orderID;
	params['CUST_ID'] 			= req.body.name.toString().replace(/\s+/g, ' ').trim();
	params['TXN_AMOUNT']		= Math.abs(parseInt(req.body.amount.replace(/\s+/g, ''))).toString();
    params['CALLBACK_URL']      = hostname+'/ieeesb/donate/status?_csrf='+req.csrfToken();
    const key = paytmCredentials.key;
    paytm.genchecksum(params,key,(err,checksum) => {
        Payments.create({
            orderId: params['ORDER_ID'],
            custId: params['CUST_ID'],
            custEmail: req.body.email,
            txnAmount: params['TXN_AMOUNT'],
            txnStatus: 'PENDING',
            checksumSent: checksum
        }).then( results => {
            res.render('donate/post',{
                params,
                checksum
            });
            return mailer.sendMail({
                auth: {
                    user: mailCredentials.mailId,
                },
                from: ' "IEEESB NIT-Delhi" <'+mailCredentials.mailId+ '>',
                to: results.custEmail,
                subject: 'Donation for IEEESB NIT-Delhi',
                html: '<div style="font-family:Roboto,sans-serif;font-size:14px">\
                <div>Dear '+results.custId+',</div>\
                <div><br></div>\
                <div>Your payment of Rs.'+results.txnAmount+', towards IEEE Student Branch NIT-Delhi,\
                 with order ID '+results.orderId+' has been initiated.</div>\
                <div>You can know the status of your payment by clicking <span>\
                <a href="'+hostname+'/ieeesb/donate/status?order_id='+results.orderId+'">here</a>.</span></div>\
                <div><br></div>\
                <div>Regards,</div>\
                <div>Technical Head</div>\
                <div>IEEESB NIT-Delhi</div>\
                <div style="display:none">'+ Date.now() +'</div>\
                </div>'
            },(error,info) => {
                if(error){
                    console.log(error);
                }
            });
        }).catch( error => {
            console.log(error);
            return next();
        });
    });
}

module.exports.postdonatestatus = async (req,res,next) => {
    let payment = await Payments.findOne({
        where: {orderId: req.body.ORDERID}
    });
    if(!payment){
        return next();
    }
    payment.txnId = req.body.TXNID || '';
    payment.bankTxnId = req.body.BANKTXNID || '';
    payment.txnStatus = req.body.STATUS || '';
    payment.respCode = req.body.RESPCODE || '';
    payment.respMsg = req.body.RESPMSG || '';
    payment.txnDate = req.body.TXNDATE || '';
    payment.checksumRecv = req.body.CHECKSUMHASH || '';
    payment.gatewayName = req.body.GATEWAYNAME || '';
    payment.bankName = req.body.BANKNAME || '';
    payment.paymentMode = req.body.PAYMENTMODE || '';
    payment.cardF6 = req.body.BIN_NUMBER || '';
    payment.cardL4 = req.body.CARD_LAST_NUMS || '';
    payment.save().then((results) => {
        res.redirect('/ieeesb/donate/status?order_id='+req.body.ORDERID);
        return mailer.sendMail({
            auth: {
                user: mailCredentials.mailId,
            },
            from: ' "IEEESB NIT-Delhi" <'+mailCredentials.mailId+ '>',
            to: results.custEmail,
            subject: 'Donation for IEEESB NIT-Delhi',
            html: '<div style="font-family:Roboto,sans-serif;font-size:14px">\
            <div>Dear '+results.custId+',</div>\
            <div><br></div>\
            <div>Your payment of Rs.'+results.txnAmount+', towards IEEE Student Branch NIT-Delhi,\
             with order ID '+results.orderId+' is '+TXNstatus(results.txnStatus)+'.</div>\
            <div>You can know the status of your payment by clicking <span>\
            <a href="'+hostname+'/ieeesb/donate/status?order_id='+results.orderId+'">here</a>.</span></div>\
            <div><br></div>\
            <div>Regards,</div>\
            <div>Technical Head</div>\
            <div>IEEESB NIT-Delhi</div>\
            <div style="display:none">'+ Date.now() +'</div>\
            </div>'
        },(error,info) => {
            if(error){
                console.log(error);
            }
        });
    });
}

module.exports.getdonatestatus = (req,res,next) => {
    let orderID = req.query.order_id;
    Payments.findOne({
        where: {orderId: orderID}
    }).then( results => {
        if(results) {
            let payinfo = {};
            payinfo['ORDER ID'] = results.orderId;
            payinfo['TXN AMOUNT'] = results.txnAmount;
            payinfo['TXN STATUS'] = TXNstatus(results.txnStatus);
            return res.render('donate/status',{
                act: '',
                user: req.session.user,
                info: payinfo
            });
        }else{
            return next();
        }
    }).catch( error => {
        console.log(error);
        return next();
    });
}

const TXNstatus = (txnStatus) => {
    if(txnStatus == 'TXN_SUCCESS') return 'SUCCESSFUL';
    else if(txnStatus == 'TXN_FAILURE') return 'FAILED';
    else return 'PENDING';
}
