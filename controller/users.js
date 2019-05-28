const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../model/User');

// @route   POST /api/users
// @desc    Register user
// @access  Public
const validationMiddlewares = [check('name', 'Name is required').not().isEmpty(), 
                               check('email','Please include a valid email').isEmail(), 
                               check('password', "Please enter a password with 6 or more characters").isLength({min:6})]

router.post('/',validationMiddlewares, async (req, res) => {

       const errors = validationResult(req);
       if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
        } 

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            //1.check user already exist
            if(user){
                return res.status(400).json({ errors: [{msg: 'User already exists'}]});
            }
            
            //2.generate an user image
            const avatar = gravatar.url(email, {
                s: '200', //size
                r: 'pg',  //rating - no naked people
                d: 'mm'   //default, mm - gives default image
            })

            //3.make a new user
            user = new User({ name, email, avatar,password });

            //4.password encrypt
            const salt    = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save(); //this thing returns a promise?

            //5.decicde what data is to be put into jwt
            const data = {
                user: {
                    id: user.id,//mongose uses abstraction use you can use id instead of _id
                }
            }

            //Sign the token into header so each subsequent request is safe
            jwt.sign(data, config.get('jwtSecret'), {expiresIn: 5000}, (err, token) => {
                  if(err) throw err;
                  res.json({token})
             })
        } 
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }


});

module.exports = router;