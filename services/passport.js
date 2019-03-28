const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// jwt Strategy
const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findOne({ _id: payload.sub })
        .then(user => {
            if (!user) return done(null, false);
            done(null, user);
        })
        .catch(err => done(err, false));
})

passport.use(jwtStrategy);

// local Strategy
const localOptions = {
    usernameField: 'email',
    session: false
}

const localStrategy = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({ email })
        .then(foundUser => {
            if (!foundUser) return done(null, false);

            bcrypt.compare(password, foundUser.password, function(err, res) {
                if (err) return done(err, false);

                if (!res) return done(null, false);

                return done(null, true); 
            })
        })
        .catch(err => done(err, false));
});

passport.use(localStrategy);