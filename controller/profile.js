const express = require('express');
const router = express.Router();
const auth = require("./middleware/auth");
const { check, validationResult } = require('express-validator/check');
const request = require("request");
const config = require('config');

const Profile = require("../model/Profile");
const User = require("../model/User");

// @route   GET api/profile
// @desc    Test route
// @access   Public

router.get('/', async (req, res) => {

    try {
        //populate only 2 attributes 
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).end("Server Error")
    }

});

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private(we need the id in token)
router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })
                                     .populate('user',['name', 'avatar']);

        if(!profile) 
            return res.status(400).json({msg: 'There is no profile for this user'});
        
            res.json(profile);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});


// @route   POST api/profile
// @desc    Create Or Update user profile
// @access  Private
router.post('/', 
            [auth, 
             check("status", "Status is required").not().isEmpty(),
             check("skills", "skills is required").not().isEmpty(),
            ],
            async (req, res) => {
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()})
                }
            console.log("route hit")
            const {
                company,
                website,
                location,
                bio,
                status,
                githubusername,
                skills,
                youtube,
                facebook,
                twitter,
                instagram,
                linkedin,
            } = req.body;

            //Build progile object
            const profileFields = {};
            profileFields.user = req.user.id;
            if(company) profileFields.company = company;
            if(website) profileFields.website = website;
            if(location) profileFields.location = location;
            if(bio) profileFields.bio = bio;
            if(status) profileFields.status = status;
            if(githubusername) profileFields.githubusername = githubusername;
            if(skills) {
                profileFields.skills = skills.split(",").map(skill => skill.trim())//make sure no leading/trailing spaces
            }

            //Build Social Object
            //@IMPORTANT: if you don't initialize like this, you will get an error saying like
            //"can't get youtube of undefined"
            profileFields.social = {}
            if(youtube) profileFields.social.youtube = youtube;
            if(twitter) profileFields.social.twitter = twitter;
            if(instagram) profileFields.social.instagram = instagram;
            if(linkedin) profileFields.social.linkedin = linkedin;

            try {
                let profile = await Profile.findOne({ user: req.user.id });
                console.log(profile);
                //update if profile exist
                if(profile){
                    profile = await Profile.findOneAndUpdate({ user: req.user.id }, 
                                                             {$set: profileFields }, 
                                                             { new: true })

                   return res.json(profile);
                }

                //Create
                profile = new Profile(profileFields);
                await profile.save();
                res.json(profile)
            } 
            catch(err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
})

// @route   GET api/profile/user/:user_id
// @desc    GET profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user:req.params.user_id}).populate('user', ['name', 'avatar'])
        
        if(!profile) return res.status(400).json({msg: "There is no profile for this user"});
        
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({msg: "Profile not found"})
        }
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/profile
// @desc    Delete profile, user & post
// @access   private

router.delete('/', auth , async (req, res) => {

    try {
        //@todo - remove users posts
        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({msg: "User has been removed"});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).end("Server Error")
    }

});

// @route   put api/profile/experience
// @desc    Add profile experience
// @access  private
router.put('/experience', 
            [
             auth,
             check('title', "Title is required").not().isEmpty(),
             check('company', 'Company is required').not().isEmpty(),
             check('from', "from data is required").not().isEmpty()
            ]
            ,async (req, res) => {

            const errors = validationResult(req);
            if(!errors.isEmpty())
              return res.status(400).json({errors: errors.array()})


         const {
             title,
             company,
             location,
             from,
             to,
             current,
             description
         } = req.body;

         const newExp = {
             title,
             company,
             location,
             from,
             to,
             current,
             description
         }

         try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
         }
         catch (err) {
             console.error(err.message);
             res.status(500).send("Server Error");
         }
})

// @route DELETE api/profile/experience/:exp_id
// @desc  Delete experiecne from profile
// @access Private
router.delete('/experience/:exp_id', auth, async (req ,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //Get Remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


// @route   put api/profile/education
// @desc    Add profile education
// @access  private
router.put('/education', 
            [
             auth,
             check('school', "school is required").not().isEmpty(),
             check('degree', 'degree is required').not().isEmpty(),
             check('from', "from data is required").not().isEmpty(),
             check('field',"field is required").not().isEmpty()
            ]
            ,async (req, res) => {

            const errors = validationResult(req);
            if(!errors.isEmpty())
              return res.status(400).json({errors: errors.array()})


         const {
             school,
             degree,
             field,
             from,
             to,
             current,
             description
         } = req.body;

         const newEdu = {
            school,
            degree,
            field,
             from,
             to,
             current,
             description
         }

         try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
         }
         catch (err) {
             console.error(err.message);
             res.status(500).send("Server Error");
         }
})

// @route DELETE api/profile/education/:edu_id
// @desc  Delete education from profile
// @access Private

router.delete('/education/:edu_id', auth, async (req ,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //Get Remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

// @route GET api/profile/github/:username
// @desc  Get user repos from Github
// @access Public

router.get('/github/:username', (req ,res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: "get",
            headers: {'user-agent': 'node.js'}
        };

        request(options, (err, response, body) => {
            if(err) console.error(error);

            if(response.statusCode !== 200){
                return res.status(404).json({msg: "No GIthub profie found"})
            }

            res.json(JSON.parse(body));
        })
    } 
    catch (err) {

    }
})



module.exports = router;