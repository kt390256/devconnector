const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {

    //Get token from header,where the token will be stored
    const token = req.header('x-auth-token');

    //CHeck if no token
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});//401 means authorization failed
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        /*@ decoded {
             user: {id: "5c98465413654ads", email: "asd@asd.com"},
            iat: 1558743971,
            exp: 1558748971
        }
        */
        req.user = decoded.user;
        next();
    }
    catch(err) {
        //this will run if the token is not valid
        res.status(401).json({msg: "Token is not valid"});
    }

}

