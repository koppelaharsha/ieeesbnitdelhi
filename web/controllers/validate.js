const { body } = require('express-validator');
const Users = require('../models/Users');

module.exports.signup = [
    body('username')
    .exists().withMessage('Enter a username')
    .trim()
    .isAlphanumeric().withMessage('Username should contain only alphanumeric characters')
    .isLength({min:3,max:31}).withMessage('Username should have 3-31 characters')
    .custom( value => {
        return Users.findOne({
            where:{username:value}
        }).then( user => {
            if(user){
                return Promise.reject('Username already exists');
            }
        })
    }),
    body('name')
    .exists().withMessage('Enter a name')
    .trim()
    .isLength({min:3,max:31}).withMessage('Name should have 3-31 characters')
    .custom(value => {
        return value.split(/\s+/).map( i => {
            if(!/^[a-zA-Z]+$/.test(i)){
                throw new Error('Name should contain only alphabets');
            }
        } )
    }),
    body('email')
    .exists().withMessage('Enter a email address')
    .trim()
    .isEmail().withMessage('Please enter a valid email')
    .custom( value => {
        return Users.findOne({
            where:{email:value}
        }).then( user => {
            if(user){
                return Promise.reject('Email already exists')
            }
        })
    }),
    body('password')
    .exists().withMessage('Enter a password')
    .isLength({min:4,max:31}).withMessage('Password should have 4-31 characters'),
    body('cpassword')
    .exists().withMessage('Enter confirmation password')
    .custom( (value, { req }) => {
        if(value !== req.body.password){
            return new Error('Incorrect confirmation password');
        }
        return true;
    })
]

module.exports.login = [
    body('email')
    .exists().withMessage('Enter email')
    .trim()
    .isEmail().withMessage('Invalid email'),
    body('password')
    .exists().withMessage('Enter password')
    .isLength({min:4,max:31}).withMessage('Invalid password')
]

module.exports.contactus = [
    body('name')
    .exists().withMessage('Enter name')
    .trim()
    .isLength({min:3,max:31}).withMessage('Name should have 3-31 characters')
    .custom(value => {
        return value.split(/\s+/).map( i => {
            if(!/^[a-zA-Z]+$/.test(i)){
                throw new Error('Name should contain only alphabets');
            }
        } )
    }),
    body('email')
    .exists().withMessage('Enter email')
    .trim()
    .isEmail().withMessage('Not a valid email'),
    body('feedback')
    .exists().withMessage('Enter feedback')
    .trim()
]

module.exports.donate = [
    body('name')
    .exists().withMessage('Enter name')
    .trim()
    .isLength({min:3,max:31}).withMessage('Name should have 3-31 characters')
    .custom(value => {
        return value.split(/\s+/).map( i => {
            if(!/^[a-zA-Z]+$/.test(i)){
                throw new Error('Name should contain only alphabets');
            }
        } )
    }),
    body('email')
    .exists().withMessage('Enter email')
    .trim()
    .isEmail().withMessage('Not a valid email'),
    body('amount')
    .exists().withMessage('Enter amount')
    .trim()
    .isNumeric().withMessage('Enter a valid amount')
]
