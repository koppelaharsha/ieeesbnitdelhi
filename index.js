const express = require('express');
const favicon = require('express-favicon');
const sequelize = require('./util/db');
const cookieParser = require('cookie-parser');
const sessions = require('./util/sessions');
const csrf = require('csurf');
const flash = require('connect-flash');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
// const cors = require('cors');

const app=express();

app.use(morgan(
    ':req[x-forwarded-for] - [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":req[x-requested-with]" ":referrer" ":user-agent"',
    {stream: fs.createWriteStream(path.join(__dirname, 'data', 'access.log'), { flags: 'a' })}
));
// app.use(cors());
app.use(helmet());
app.use(favicon('./public/images/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
// app.use(cookieParser());
app.use(sessions);
app.use(csrf());
// app.use(csrf({value:(req)=>req.cookies['csrf-token']}));
// app.use((req,res,next)=>{ res.cookie('csrf-token',req.csrfToken(),{maxAge:86400000}); next(); });
app.use(flash());
app.set('view engine','ejs');
app.set('views','views');

const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
// const facultyRoutes=require('./routes/faculty');
const adminRoutes=require('./routes/admin');
const mainRoutes=require('./routes/main');
const donateRoutes=require('./routes/donate');

app.get('/hello',(req,res)=>{res.send('Hello')});
app.use(authRoutes);
app.use('/u',userRoutes);
// app.use('/f',facultyRoutes);
app.use('/admin',adminRoutes);
app.use(donateRoutes);
app.use(mainRoutes);

// const User=require('./models/Users');
// const Blog=require('./models/Blogs');

// User.hasMany(Blog);
// Blog.belongsTo(User);

sequelize.sync().then( result => {
        app.listen(1333,'localhost');
    }).catch( err => {
        console.log(err);
    });
