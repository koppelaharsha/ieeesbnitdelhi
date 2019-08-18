const express = require('express');
const favicon = require('express-favicon');
const sequelize = require('./util/db');
const cookieParser = require('cookie-parser');
const sessions = require('./util/sessions');
const csrf = require('csurf');
const flash = require('connect-flash');
const helmet = require('helmet');
const dotenv = require('dotenv');
const compressor = require('compression');
// const cors = require('cors');

dotenv.config();
const app=express();

app.use(compressor());
// app.use(cors());
app.use(helmet());
app.use(express.static('public')),
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
app.use(sessions);
app.use(csrf());
app.use(flash());
app.set('view engine','ejs');
app.set('views','web/views');

app.use('/',
    require('./web/util/logger'),
    favicon('web/public/images/favicon.ico'),
    require('./web/routes/router')
);

// const User=require('./models/Users');
// const Blog=require('./models/Blogs');

// User.hasMany(Blog);
// Blog.belongsTo(User);

sequelize.sync()
    .then( result => {
        app.listen(process.env.PORT,'localhost');
    }).catch( err => {
        console.log(err);
    });
