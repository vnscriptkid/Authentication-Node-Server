const User = require('../models/User');
const {secret} = require('../config');
const jwt = require('jwt-simple');
const passport = require('passport');

function createUserToken(user) {
    const payload = {
        sub: user.id,
        iat: new Date().getTime()
    }
    return jwt.encode(payload, secret);
}

exports.signup = (req, res, next) => {
    // 1. Extract email and password out of req.body
    const {email, password} = req.body;

    // 2. Check if email already exists
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(422).send({ error: `Email \`${email}\` is in use!` });
            }
            const newUser = new User({ email, password });
            newUser.save()
            .then((result) => {
                res.json({ success: true, token: createUserToken(result) });
            })
            .catch(next);
        })
        .catch(next);
        
        // 2.1. If yes, send an error, stop here
        
        // 2.2. If no, create a new user and save to db
        
        // 3. Send the newly created user back
    }
    
    exports.logout = (req, res, next) => {
        
    }
    
    exports.login = (req, res, next) => {
        // user have correct email & password, give them token now
        res.json({ success: true, token: createUserToken(req.user) });
    }