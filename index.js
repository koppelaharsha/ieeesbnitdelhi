const express = require('express');
const sequelize = require('./util/db');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const compressor = require('compression');
// const cors = require('cors');

dotenv.config();
const app=express();

app.use(compressor());
// app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());

// app.use('/crypto', require('./crypto/index'));
app.use('/', require('./web/index'));

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
