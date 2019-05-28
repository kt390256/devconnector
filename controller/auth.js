const express = require('express');
const router = express.Router();
const auth = require("./middleware/auth");
const User = require("../model/User");
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

// @route   GET /api/auth
// @desc    Test route
// @access  Public

//protected by jwt auth middleware, if token fails, you aint accessing this
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password");//leave off the password and avatar in the data
        
        res.json(user);
        //res.json({msg: "You have been logged in"})
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/auth
// @desc    Authenticate user & get token (Login)
// @access  Public
const validationMiddlewares = [check('email','Please include a valid email').isEmail(), 
                               check('password', "Password is required").exists()]

router.post('/',validationMiddlewares, async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
             return res.status(400).json({errors: errors.array()});
     } 

     const { email, password } = req.body;

     try {
         let user = await User.findOne({ email });
         if(!user){
             return res.status(400).json({ errors: [{msg: 'User doesnt exist'}]});
         }

         //compare plain text password
         const isMatch = await bcrypt.compare(password, user.password);

         if(!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]});
         }

         const data = {
             user: {
                 id: user.id,//mongose uses abstraction use you can use id instead of _id
                 email: user.email
             }
         }

         //Need to sign when you login
         jwt.sign(data, config.get('jwtSecret'), 
                  {expiresIn: '1h'}, (err, token) => {
               if(err) throw err;
               res.json({token})
          })

     } 
     catch (err) {
         console.log("error occurred")
         console.error(err.message);
         res.status(500).send('Server error');
     }


});


module.exports = router;